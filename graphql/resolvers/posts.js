const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const Entity = require('../../models/Entity')
const User = require('../../models/User')
const Image = require('../../models/Image')
const checkAuth = require('../../utils/checkAuth')
const comments = require('./comments')

const { savePictureToDB } = require('./methods/savePictureToDB')
const { deletePicture } = require('../../services/firebaseStorage')

module.exports = {
    Query: {
        async posts(
            _,
            {
                userId,
                paginationData: {
                    limit,
                    cursor,
                    sortBy = 'createdAt',
                    sort: sortDir = 'DESCENDING',
                },
            },
            context
        ) {
            // if user Id => search all posts if user===userId
            // if !context.user => search only public posts
            // if context.user => search 1. first posts that fuser.friends.contains(context.user)
            //                           2. if posts.length < limit => search for public posts
            // timeLimit for friends posts
            // if userId === context.user show all posts
            let filter = { type: 'POST' }
            let sort = {}
            const sortingValues = {
                ASCENDING: 1,
                DESCENDING: -1,
            }
            sort[sortBy] = sortingValues[sortDir]
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
                try {
                    const posts = await Entity.find(filter, null, {
                        sort,
                    })
                    const cursorIndex = posts.findIndex((post) => post._id.toString() === cursor) // not defined cursor => return -1
                    const next = cursorIndex + 1 // to not return the cursor second time, also this take care of situation when cursor is not defined
                    return posts.slice(next, next + limit)
                } catch (err) {
                    throw new Error(err)
                }
            }
        },
        async post(_, { postId }) {
            try {
                const post = await Entity.findById(postId) //Post from mongoose Schemes
                return post
            } catch (err) {
                throw new Error('Post not found')
            }
        },
    },

    Mutation: {
        async createPost(_, { body, title, privacy = 'PUBLIC', images }, context) {
            //check if user is authenitaced
            const user = checkAuth(context)
            //if check auth fails to confirm token, error is being thrown
            // so if get to this blok of code thats means [user] definetly exists
            if (body && !title)
                if (body.trim() === '') {
                    throw new Error('Post body must not be empty')
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
        async images({ id, images }) {
            if (images.length) return await Promise.all(images.map((img) => Image.findById(img)))
            return await Image.find({ post: id })
        },
        async comments({ children }, { paginationData: { limit, cursor } }) {
            const index = children.findIndex((id) => id === cursor)
            const next = index + 1
            return await Promise.all(
                children.slice(next, next + limit).map((id) => Entity.findById(id))
            )
        },
        commentsCount: (parent) => parent.children.length,
        reactionsCount: (parent) => parent.reactions.length,
    },
}
