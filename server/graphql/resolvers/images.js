const Image = require('../../models/Image')
const Entity = require('../../models/Entity')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        updatePicture: async (_, { id, field, newValue }, context) => {
            const user = checkAuth(context)
            const image = await Image.findByIdAndUpdate(
                id,
                { [field]: newValue },
                { new: true, useFindAndModify: false }
            )
            return image
        },
        uploadPicture: async (_, { ImageInput }, context) => {
            const user = checkAuth(context)
            const newImage = Image({
                ...ImageInput,
                createdAt: new Date().toISOString(),
                uploadedBy: user.id,
                author: {
                    name: user.username,
                    link: null,
                },
            })

            const image = await newImage.save()
            return image
        },
    },
    Query: {
        image: async (_, { imageId }) => {
            try {
                const image = await Image.findOne({ _id: imageId }).populate('post')
                return image
            } catch (error) {
                return new Error(error)
            }
        },
    },
    Image: {
        urls: ({ urls, id }) => {
            return { ...urls, id }
        },
    },
}
