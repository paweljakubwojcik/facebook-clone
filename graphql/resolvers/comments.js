const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post');
const { Mutation } = require('./users');
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username, id } = checkAuth(context)

            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Coment body must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId)

            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString(),
                    user: id
                })
                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found')
            }

        },
        deleteComment: async (_, { commentId, postId }, context) => {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId)

                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post not found', {
                    errors: {
                        post: 'Post doesn\'t exist'
                    }
                })
            }
        },
        async likeComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                const comment = post.comments.find(comment => comment.id === commentId)
                const indexOfComment = post.comments.indexOf(comment)
                console.log(indexOfComment)
                if (comment.likes.find(like => like.username === username)) {
                    comment.likes = comment.likes.filter(like => like.username !== username)
                } else {
                    comment.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                post.comments[indexOfComment] = comment

                await post.save()
                return post
            } catch (e) {
                throw new UserInputError(e)
            }
        },

    }
}