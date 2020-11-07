const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post');
const { Mutation } = require('./users');
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 }); //Get posts and sort them
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
        async createPost(_, { body }, context) {
            //check if user is authenitaced
            const user = checkAuth(context)
            //if check auth fails to confirm token, error is being thrown
            // so if get to this blok of code thats means [user] definetly exists

            if (body.trim() === "") {
                throw new Error('Post body must not be empty')
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
                likes: [],
                comments: []
            })

            const post = await newPost.save()

            return post
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if (user.username === post.username) {
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
            const { username } = checkAuth(context)
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


    }
}