const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const Entity = require('../../models/Entity')
const User = require('../../models/User')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body, image }, context) => {
            try {
                const { id } = checkAuth(context)

                if (body.trim() === '') {
                    throw new UserInputError('Empty comment', {
                        errors: {
                            body: 'Coment body must not be empty',
                        },
                    })
                }

                const post = await Entity.findById(postId)
                if (!post) throw new UserInputError('Post not found')

                const comment = new Entity({
                    type: 'COMMENT',
                    body,
                    createdAt: new Date().toISOString(),
                    timestamp: Date.now(),
                    user: id,
                    images: [],
                    parent: postId,
                    children: [],
                })

                const imageId = await savePictureToDB(image, user, { post: comment })
                comment.images = [imageId]

                const commentId = await comment.save()
                post.children.unshift(commentId.id)

                return await post.save()
            } catch (err) {
                return err
            }
        },
        createReply: async (_, { commentId, body, image }, context) => {
            try {
                const { id } = checkAuth(context)

                if (body.trim() === '') {
                    throw new UserInputError('Empty reply', {
                        errors: {
                            body: 'Reply body must not be empty',
                        },
                    })
                }

                const comment = await Entity.findById(commentId)
                if (!post) throw new UserInputError('Post not found')

                const reply = new Entity({
                    type: 'REPLY',
                    body,
                    createdAt: new Date().toISOString(),
                    timestamp: Date.now(),
                    user: id,
                    images: [],
                    parent: commentId,
                })

                const imageId = await savePictureToDB(image, user, { post: reply })
                reply.images = [imageId]

                const replyId = await reply.save()
                comment.children.unshift(replyId.id)

                return await comment.save()
            } catch (err) {
                return err
            }
        },
        /**
         * @deprecated
         */
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
        async replies({ children }, { paginationData: { limit, cursor } }) {
            const index = children.findIndex((id) => id === cursor)
            return await Promise.all(
                children.slice(index, index + limit).map((id) => Entity.findById(id))
            )
        },
        reactionsCount: (parent) => parent.reactions.length,
        repliesCount: (parent) => parent.children.length,
    },
}
