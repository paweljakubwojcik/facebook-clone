const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post');
const User = require('../../models/User');
const Image = require('../../models/Image');
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getPosts(_, { userId, limit, offset }, context) {
            // if user Id => search only posts if user===userId
            // if !context.user => search only public posts
            // if context.user => search 1. first posts that fuser.friends.contains(context.user)
            //                           2. if posts.length < limit => search for public posts
            // timeLimit for friends posts
            // if userId === context.user show all posts 
            const user = checkAuth(context)

            let filter = {}
            if (userId)
                filter.user = userId
            if (!user)
                filter.privacy = 'PUBLIC'
            if (user)
                filter = { ...filter, $or: [{ privacy: 'PUBLIC' }, { privacy: 'PRIVATE', user: user.id }, { privacy: 'FRIENDS_ONLY' }] }

            try {
                const posts = await Post.find(filter, null, { sort: { createdAt: -1 }, skip: offset, limit: limit })
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId); //Post from mongoose Schemes
                return post
            } catch (err) {
                throw new Error("Post not found")
            }
        },
    },

    Mutation: {
        async createPost(_, { body, title, privacy = 'PUBLIC' }, context) {
            //check if user is authenitaced
            const user = checkAuth(context)
            //if check auth fails to confirm token, error is being thrown
            // so if get to this blok of code thats means [user] definetly exists
            if (body && !title)
                if (body.trim() === "") {
                    throw new Error('Post body must not be empty')
                }

            const newPost = new Post({
                body,
                title,
                privacy,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
                likes: [],
                comments: [],
                isDeletable: true,
            })

            const post = await newPost.save()

            return post
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if (user.username === post.username) {

                    const images = await Image.find({ post: postId })
                    Promise.all(Array.from(images).map(image => image.delete()))

                    await post.delete()
                    return 'post deleted succesfully'
                } else {
                    throw new AuthenticationError('User is not the owner of the post')
                }
            } catch (e) {
                throw new Error(e)
            }
        },

        async likePost(_, { postId }, context) {
            const { username, id } = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if (post.likes.find(like => like.username === username)) {
                    // Post already liked
                    post.likes = post.likes.filter(like => like.username !== username)
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save()
                return post
            } catch (e) {
                throw new UserInputError(e)
            }
        },

        async editPost(_, { postId, field, newValue }, context) {
            const { username } = checkAuth(context)
            try {
                const post = await Post.findById(postId)

                if (post.username === username) {
                    post[field] = newValue
                    return await post.save()
                }
                else
                    throw AuthenticationError('User is not owner of the post')

            } catch (error) {
                throw new Error(e)
            }
        }
    },
    Post: {
        async user({ user }) {
            return await User.findById(user)
        },
        async images({ id }) {
            return await Image.find({ post: id })
        },
    }
}