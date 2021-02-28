const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const User = require('../../models/User')
const Image = require('../../models/Image')
const checkAuth = require('../../utils/checkAuth')
const comments = require('./comments')

const { savePictureToDB } = require('./methods/savePictureToDB')
const { deletePicture } = require('../../services/firebaseStorage')

module.exports = {
    Query: {
        async posts(_, { userId, paginationData: { limit, cursor } }, context) {
            // if user Id => search all posts if user===userId
            // if !context.user => search only public posts
            // if context.user => search 1. first posts that fuser.friends.contains(context.user)
            //                           2. if posts.length < limit => search for public posts
            // timeLimit for friends posts
            // if userId === context.user show all posts
            let filter = {}
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
            } finally {
                try {
                    const posts = await Post.find(filter, null, {
                        sort: { createdAt: -1 },
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
                const post = await Post.findById(postId) //Post from mongoose Schemes
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
                const newPost = new Post({
                    body,
                    title,
                    privacy,
                    user: user.id,
                    createdAt: new Date().toISOString(),
                    timestamp: Date.now(),
                    reactions: [],
                    comments: [],
                    images: [],
                    isDeletable: true,
                })

                const post = await newPost.save()

                const savedImages = await Promise.all(
                    images.map((img) => savePictureToDB(img, user, { post }))
                )

                post.images = savedImages

                return await post.save()
            } catch (e) {
                throw e
            }
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if (user.id === post.user.toString()) {
                    const images = await Image.find({ post: postId })
                    await Promise.all(
                        Array.from(images).map(({ filename }) => deletePicture(filename))
                    )
                    await Promise.all(Array.from(images).map((image) => image.delete()))

                    await post.delete()
                    return 'post deleted succesfully'
                } else {
                    throw new AuthenticationError('User is not the owner of the post')
                }
            } catch (e) {
                throw new Error(e)
            }
        },

        async reactToPost(_, { postId, type }, context) {
            try {
                const { id } = checkAuth(context)
                const post = await Post.findById(postId)
                const addReaction = () => {
                    post.reactions.push({
                        type,
                        createdAt: new Date().toISOString(),
                        timestamp: Date.now(),
                        user: id,
                    })
                }
                const reaction = post.reactions.find((like) => like.user == id)
                if (reaction) {
                    // Post already liked
                    post.reactions = post.reactions.filter((like) => like.user != id)
                    if (reaction.type !== type) addReaction()
                } else {
                    addReaction()
                }

                return await post.save()
            } catch (e) {
                throw new UserInputError(e)
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
        async images({ id, images }) {
            if (images.length) return await Promise.all(images.map((img) => Image.findById(img)))
            return await Image.find({ post: id })
        },
    },
    Reaction: {
        async user({ user }) {
            return await User.findById(user)
        },
    },
}
