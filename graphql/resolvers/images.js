const Image = require('../../models/Image')

module.exports = {

    Mutation: {
        uploadPic: async () => {

        }
    },
    Query: {
        getImage: async (_, { imageId }) => {
            console.log(imageId)
            try {
                const image = await Image.findById(imageId)
                return image
            } catch (error) {
                return new Error(error)
            }

        }
    }


}