const admin = require('firebase-admin')
const sharp = require('sharp')
const generateRandomString = require('../utils/generateRandomString')

let serviceAccount = {
    type: 'service_account',
    project_id: 'fake-facebook-2a769',
    private_key_id: process.env.GOOGLE_STORAGE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY,
    client_email: 'firebase-adminsdk-lxjff@fake-facebook-2a769.iam.gserviceaccount.com',
    client_id: '118171924157745807886',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lxjff%40fake-facebook-2a769.iam.gserviceaccount.com',
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'fake-facebook-2a769.appspot.com/',
})

const bucket = admin.storage().bucket()

const sizes = {
    thumbnail: 60,
    small: 200,
    medium: 900,
    large: 1920,
}

/**
 * uploads imagege file to firebase storage in 4 sizes,
 * and returns name of file as on the storage, and object containing public urls to all sizes
 *
 * @param {Promise<File>} image - an object of type Upload (Apollo Graphql schema)
 * @returns {Promise<{urls: {large: String, medium:String, small: String, thumbnail:String}, filename: String}>} data
 */
module.exports.uploadPicture = async function uploadPicture(image) {
    const { createReadStream, filename: name, mimetype, encoding } = await image

    const filename = `${generateRandomString()}_${name.trim().replace(/([() ])/g, '')}`
    const urls = {}

    try {
        await Promise.all(
            Object.entries(sizes).map(
                ([key, size]) =>
                    new Promise((res, rej) => {
                        const pipeline = sharp()
                        const filenameWithPrefix = `${key}__${filename}`

                        const uploadStream = bucket.file(filenameWithPrefix).createWriteStream({
                            public: true,
                        })

                        pipeline.resize({ width: size }).pipe(uploadStream)

                        createReadStream().pipe(pipeline)

                        uploadStream
                            .on('finish', () => {
                                urls[key] = bucket.file(filenameWithPrefix).publicUrl()
                                res()
                            })
                            .on('error', rej)
                    })
            )
        )
    } catch (error) {
        throw error
    }

    return { urls, filename }
}

/**
 * deletes a file from bucket
 * @param {String} filename - name of file as is on storage,
 */
module.exports.deletePicture = async (filename) => {
    if (!filename) {
        console.warn('filename is undefined')
        return
    }
    try {
        await Promise.all(
            Object.entries(sizes).map(
                ([key, size]) =>
                    new Promise((res, rej) => {
                        const filenameWithPrefix = `${key}__${filename}`

                        bucket
                            .file(filenameWithPrefix)
                            .delete()
                            .then(() => {
                                res()
                            })
                            .catch((e) => {
                                rej(e)
                            })
                    })
            )
        )
    } catch (e) {
        throw e
    }
}
