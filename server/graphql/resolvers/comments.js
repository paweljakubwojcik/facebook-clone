const { UserInputError } = require('apollo-server')
const Comment = require('../../models/Comment')
const Post = require('../../models/Post')
const Entity = require('../../models/Entity')
const User = require('../../models/User')
const Image = require('../../models/Image')
const checkAuth = require('../../utils/checkAuth')
const { savePictureToDB } = require('./methods/savePictureToDB')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body, images }, context) => {
            try {
                const user = checkAuth(context)

                if (body.trim() === '') {
                    throw new UserInputError('Coment body must not be empty', {
                        errors: {
                            body: 'Coment body must not be empty',
                        },
                    })
                }

                const post = await Post.findById(postId)
                if (!post) throw new UserInputError('Post not found')

                const newComment = new Comment({
                    body,
                    createdAt: new Date().toISOString(),
                    timestamp: Date.now(),
                    user: user.id,
                    images: [],
                    parent: postId,
                    children: [],
                })

                const comment = await newComment.save()
                post.children.unshift(comment.id)

                if (images) {
                    const savedImages = await Promise.all(
                        images.map((img) => savePictureToDB(img, user, { post: comment.id }))
                    )
                    comment.images = savedImages
                }

                await comment.save()

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

                const comment = await Comment.findById(commentId)
                if (!post) throw new UserInputError('Comment not found')

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
            /*  */
            throw new Error('method deprecated, use react(): Entity instead')
        },
    },
    Comment: {
        async user({ user }, params, context) {
            return await User.findById(user)
        },
        async replies({ children }, { paginationData: { limit, cursor } }) {
            const index = children.findIndex((id) => id === cursor)
            return await Promise.all(
                children.slice(index, index + limit).map((id) => Entity.findById(id))
            )
        },
        async images({ id }) {
            return await Image.find({ post: id })
        },
        reactionsCount: (parent) => parent.reactions.length,
        repliesCount: (parent) => parent.children.length,
        timestamp: ({ createdAt, timestamp }) => (timestamp ? timestamp : dayjs(createdAt).unix()),
    },
}
