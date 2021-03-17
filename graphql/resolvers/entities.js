const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const Entity = require('../../models/Entity')
const User = require('../../models/User')
const Image = require('../../models/Image')
const checkAuth = require('../../utils/checkAuth')
const comments = require('./comments')

const { savePictureToDB } = require('./methods/savePictureToDB')
const { deletePicture } = require('../../services/firebaseStorage')

const dayjs = require('dayjs')

module.exports = {
    Mutation: {
        react: async (_, { id, type }, context) => {
            try {
                const { id: user } = checkAuth(context)
                const entity = await Entity.findById(id)
                const addReaction = () => {
                    entity.reactions.push({
                        type,
                        createdAt: new Date().toISOString(),
                        timestamp: Date.now(),
                        user,
                    })
                }
                const reaction = entity.reactions.find(
                    (reaction) => reaction.user.toString() === user
                )
                if (reaction) {
                    // Post already has a reaction
                    entity.reactions = entity.reactions.filter(
                        (reaction) => reaction.user.toString() !== user
                    )
                    if (reaction.type !== type) addReaction()
                } else {
                    addReaction()
                }
                return await entity.save()
            } catch (e) {
                throw new UserInputError(e)
            }
        },
        delete: async (_, { id }, context) => {
            //TODO: test deleting children after return
            const deleteEntity = async (id) => {
                const entity = await Entity.findById(id)
                //deleting all images associated with entity
                const images = await Promise.all(entity.images.map((id) => Image.findById(id)))
                await Promise.all(Array.from(images).map(({ filename }) => deletePicture(filename)))
                await Promise.all(Array.from(images).map((image) => image.delete()))
                //deleting all children
                if (entity.children.length)
                    await Promise.all(entity.children.map((id) => deleteEntity(id)))
                //deleting the entity
                return await entity.delete()
            }

            const user = checkAuth(context)
            try {
                const entity = await Entity.findById(id)

                if (user.id === entity.user.toString()) {
                    //removing entity from parent's list of children
                    if (entity.parent) {
                        const parent = await Entity.findById(entity.parent)
                        parent.children = parent.children.filter(
                            (child) => child.toString() !== entity.id
                        )
                        await parent.save()
                    }
                    return await deleteEntity(id)
                } else {
                    throw new AuthenticationError('User is not the owner of the post')
                }
            } catch (e) {
                throw new Error(e)
            }
        },
    },
    Query: {
        entities: async (_, params, context) => {
            try {
                return await Entity.find()
            } catch (error) {
                return error
            }
        },
    },
    Entity: {
        async __resolveType({ type }, context, info) {
            switch (type) {
                case 'POST':
                    return 'Post'
                case 'COMMENT':
                    return 'Comment'
                case 'REPLY':
                    return 'Reply'
                default:
                    return 'Post'
            }
        },
        
    },
    Reaction: {
        async user({ user }) {
            return await User.findById(user)
        },
    },
}
