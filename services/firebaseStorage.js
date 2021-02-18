
const admin = require("firebase-admin");
const sharp = require('sharp');
const generateRandomString = require('../utils/generateRandomString')

let serviceAccount = require("./config.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "fake-facebook-2a769.appspot.com/"
});

const bucket = admin.storage().bucket();

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
 * @returns {{urls: {large: String, medium:String, small: String, thumbnail:String}, filename: String}} data
 */
module.exports.uploadPicture = async function uploadPicture(image) {
    const { createReadStream, filename: name, mimetype, encoding } = await image

    const filename = `${generateRandomString()}_${name.trim().replace(/([() ])/g, "")}`
    const urls = {}

    try {
        await Promise.all(
            Object.entries(sizes).map(([key, size]) =>
                new Promise((res, rej) => {
                    const pipeline = sharp()
                    const filenameWithPrefix = `${key}__${filename}`

                    const uploadStream = bucket.file(filenameWithPrefix).createWriteStream({
                        public: true
                    })

                    pipeline
                        .resize({ width: size })
                        .pipe(uploadStream)

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
    try {
        await Promise.all(
            Object.entries(sizes).map(
                ([key, size]) =>
                    new Promise((res, rej) => {

                        const filenameWithPrefix = `${key}__${filename}`

                        bucket.file(filenameWithPrefix).delete()
                            .then(() => { res() })
                            .catch((e) => { rej(e) })
                    })
            )
        )
    } catch (e) {
        throw e
    }

}