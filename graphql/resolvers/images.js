const Image = require('../../models/Image')
const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')

module.exports = {

    Mutation: {
        uploadPicture: async (_, { ImageInput }, context) => {
            const user = checkAuth(context)
            const newImage = Image({
                ...ImageInput,
                createdAt: new Date().toISOString(),
                uploadedBy: user.id,
                author: {
                    name: user.username,
                    link: null
                }
            })

            const image = await newImage.save()
            return image
        }
    },
    Query: {
        image: async (_, { imageId }) => {
            try {
                const image = await Image.findById(imageId)
                return image
            } catch (error) {
                return new Error(error)
            }

        }
    },
    Image: {
        post: async ({ post }) => {
            return await Post.findById(post)
        },
        urls: ({ urls, id }) => {
            return { ...urls, id }
        }
    },



}