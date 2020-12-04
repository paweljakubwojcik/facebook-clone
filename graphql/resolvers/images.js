const Image = require('../../models/Image')
const Post = require('../../models/Post')

module.exports = {

    Mutation: {
        uploadPic: async () => {

        }
    },
    Query: {
        getImage: async (_, { imageId }) => {
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
        }
    }


}