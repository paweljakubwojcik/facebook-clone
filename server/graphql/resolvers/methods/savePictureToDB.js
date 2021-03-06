const Image = require('../../../models/Image')
const { uploadPicture } = require('../../../services/firebaseStorage')

module.exports.savePictureToDB = async (image, user, additionalFields) => {
    const { urls, filename } = await uploadPicture(image)

    const newImage = Image({
        urls,
        filename,
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
        uploadedBy: user.id,
        author: {
            name: user.username,
            link: null,
        },
        storageProvider: 'FIREBASE_STORAGE',
        ...additionalFields,
    })

    return await newImage.save()
}
