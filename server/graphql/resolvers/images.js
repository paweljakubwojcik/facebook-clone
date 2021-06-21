const Image = require('../../models/Image')
const checkAuth = require('../../utils/checkAuth')
const dayjs = require('dayjs')
const { getImageOfTheDay } = require('../../services/unsplash')

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
        imageOfTheDay: async () => {
            try {
                let image = await Image.findOne({ role: 'IMAGE_OF_THE_DAY' })

                if (!image) {
                    const newImage = await getImageOfTheDay()
                    image = new Image({
                        ...newImage,
                        role: 'IMAGE_OF_THE_DAY',
                    })
                }

                // check if this is today
                if (dayjs(image.timestamp).day() !== dayjs(Date.now()).day()) {
                    //change image
                    const newImage = await getImageOfTheDay()
                    Object.entries(newImage).forEach(([key, value]) => {
                        image[key] = value
                    })
                    image.timestamp = Date.now()
                }

                await image.save()

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
