const { AuthenticationError, UserInputError } = require('apollo-server')
const Entity = require('../../models/Entity')
const User = require('../../models/User')
const Image = require('../../models/Image')
const checkAuth = require('../../utils/checkAuth')

const { savePictureToDB } = require('./methods/savePictureToDB')
const { getPaginatedResult } = require('./methods/cursorPagination')
const dayjs = require('dayjs')

module.exports = {
    Query: {
        async posts(_, { userId, paginationData }, context) {
            // if user Id => search all posts if user===userId
            // if !context.user => search only public posts
            // if context.user => search 1. first posts that fuser.friends.contains(context.user)
            //                           2. if posts.length < limit => search for public posts
            // timeLimit for friends posts
            // if userId === context.user show all posts
            let filter = { type: 'POST' }
            try {
                const user = checkAuth(context)
                if (userId) filter.user = userId
                if (user) {
                    const { friends } = await User.findById(user.id)
                    filter = {
                        ...filter,
                        $or: [
                            { privacy: 'PUBLIC' },
                            {
                                privacy: ['PRIVATE', 'FRIENDS_ONLY'],
                                user: user.id,
                            },
                            { privacy: ['FRIENDS_ONLY'], user: friends },
                        ],
                    }
                }
            } catch (error) {
                if (!user) filter.privacy = 'PUBLIC'
                else throw error
            } finally {
                return await getPaginatedResult(filter, paginationData, Entity)
            }
        },
        async post(_, { postId }) {
            try {
                const post = await Entity.findById(postId)
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
                const newPost = new Entity({
                    body,
                    title,
                    type: 'POST',
                    privacy,
                    user: user.id,
                    createdAt: new Date().toISOString(),
                    timestamp: Date.now(),
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
                const post = await Entity.findById(postId)
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
        async comments({ id }, { paginationData }) {
            return await getPaginatedResult({ parent: id }, paginationData, Entity)
        },
        commentsCount: (parent) => parent.children.length,
        reactionsCount: (parent) => parent.reactions.length,
        timestamp: ({ createdAt, timestamp }) => (timestamp ? timestamp : dayjs(createdAt).unix()),
    },
}
