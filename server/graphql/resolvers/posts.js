const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const User = require('../../models/User')
const Image = require('../../models/Image')
const checkAuth = require('../../utils/checkAuth')

const { savePictureToDB } = require('./methods/savePictureToDB')
const { getPaginatedResult, paginateResult } = require('./methods/cursorPagination')
const dayjs = require('dayjs')
const getPrivacyFilter = require('./methods/getPrivacyFilter')

module.exports = {
    Query: {
        async posts(_, { userId, paginationData }, context) {
            // if user Id => search all posts if user===userId
            // if !context.user => search only public posts
            // if context.user => search 1. first posts that fuser.friends.contains(context.user)
            //                           2. if posts.length < limit => search for public posts
            // timeLimit for friends posts
            // if userId === context.user show all posts

            const filter = await getPrivacyFilter({
                userId,
                context,
                initialFilter: {},
            })
            return await getPaginatedResult(filter, paginationData, Post)
        },
        async post(_, { postId }) {
            try {
                const post = await Post.findById(postId)
                return post
            } catch (err) {
                throw new Error('Post not found')
            }
        },
    },

    Mutation: {
        async createPost(_, { body = '', title, privacy = 'PUBLIC', images }, context) {
            //check if user is authenitaced
            const user = checkAuth(context)
            //if check auth fails to confirm token, error is being thrown
            // so if get to this blok of code thats means [user] definetly exists
            if (body && !title) {
                if (body && body.trim() === '') {
                    throw new Error('Post body must not be empty')
                }
            }

            try {
                const newPost = new Post({
                    body,
                    title,
                    type: 'POST',
                    privacy,
                    user: user.id,
                    createdAt: new Date().toISOString(),
                    reactions: [],
                    children: [],
                    images: [],
                    isDeletable: true,
                })

                const post = await newPost.save()

                //adding images
                const savedImages = await Promise.all(
                    images.map((img) => savePictureToDB(img, user, { post }))
                )
                post.images = savedImages

                return await post.save()
            } catch (e) {
                throw e
            }
        },

        async editPost(_, { postId, field, newValue }, context) {
            const { id } = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if (post.user.toString() === id) {
                    post[field] = newValue
                    return await post.save()
                } else throw AuthenticationError('User is not owner of the post')
            } catch (error) {
                throw new Error(e)
            }
        },
    },
    Post: {
        async user({ user }) {
            return await User.findById(user)
        },
        async images({ id }) {
            return await Image.find({ post: id })
        },
        async comments({ id, children }, { paginationData }) {
            return paginateResult(
                {},
                paginationData,
                await Promise.all(children.map((id) => Comment.findById(id)))
            )
        },
        commentsCount: (parent) => parent.children.length,
        reactionsCount: (parent) => parent.reactions.length,
        timestamp: ({ createdAt, timestamp }) =>
            timestamp ? timestamp : dayjs(createdAt).valueOf(),
    },
}
