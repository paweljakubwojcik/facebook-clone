
const Image = require('../../models/Image')
const { uploadPicture } = require('../../services/firebaseStorage')

module.exports.savePictureToDB = async (
    image,
    user,
    additionalFields
) => {

    const { urls, filename } = await uploadPicture(image)

    const newImage = Image({
        urls,
        filename,
        createdAt: new Date().toISOString(),
        uploadedBy: user.id,
        author: {
            name: user.username,
            link: null
        },
        ...additionalFields
    })

    return await newImage.save()

}