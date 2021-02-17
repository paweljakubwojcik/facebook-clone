
const admin = require("firebase-admin");
const path = require('path')
const fs = require('fs')
const sharp = require('sharp');

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


module.exports.uploadPictures = async (images = []) => {

    const urls = []

    await Promise.all(
        images.map(async (file) => {
            const res = await uploadPicture(file)
            urls.push(res)
        })
    )
    console.log(urls)
}


module.exports.uploadPicture = async function uploadPicture(image) {
    //TODO: add hash to prevent duplications
    const { createReadStream, filename, mimetype, encoding } = await image

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
                        .resize(size, size)
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

//TODO: to test this function
module.exports.deletePicture = async (filename) => {
    try {
        await Promise.all(
            Object.entries(sizes).map(([key, size]) =>
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