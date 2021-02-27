const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const User = require('../../models/User')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { id } = checkAuth(context)

            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Coment body must not be empty',
                    },
                })
            }

            const post = await Post.findById(postId)

            if (post) {
                post.comments.unshift({
                    body,
                    createdAt: new Date().toISOString(),
                    timestamp: Date.now(),
                    user: id,
                })
                return await post.save()
            } else {
                throw new UserInputError('Post not found')
            }
        },
        deleteComment: async (_, { commentId, postId }, context) => {
            const { id } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                const commentIndex = post.comments.findIndex((c) => c.id === commentId)

                if (post.comments[commentIndex].user == id) {
                    post.comments.splice(commentIndex, 1)

                    return await post.save()
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post not found', {
                    errors: {
                        post: "Post doesn't exist",
                    },
                })
            }
        },
        //TODO: change to reaction
        async reactToComment(_, { postId, commentId, type }, context) {
            const { id } = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                const comment = post.comments.find((comment) => comment.id === commentId)
                const indexOfComment = post.comments.indexOf(comment)
                const reaction = comment.reactions.find((reaction) => reaction.user == id)

                if (reaction) {
                    comment.reactions = comment.reactions.filter((reaction) => reaction.user != id)
                    if (reaction.type !== type)
                        comment.reactions.push({
                            type,
                            user: id,
                            createdAt: new Date().toISOString(),
                        })
                } else {
                    comment.reactions.push({
                        type,
                        user: id,
                        createdAt: new Date().toISOString(),
                    })
                }

                post.comments[indexOfComment] = comment

                await post.save()
                return post
            } catch (e) {
                throw new UserInputError(e)
            }
        },
    },
    Comment: {
        async user({ user }) {
            return await User.findById(user)
        },
    },
}
