const Unsplash = require('unsplash-js').default
const {toJson} = require('unsplash-js')
global.fetch = require('node-fetch')
const APP_ACCESS_KEY = require('../config.js').UNSPLASH_APP_KEY

const Image = require('../models/Image')

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY })

/**
 *
 * @param {String} type - 'background' || 'avatar'
 * @param {String} owner - id of user for who this picture belongs to
 *  @param {String} postId - id of post that will contain those photos
 */

module.exports.generateRandomPhoto = async (type, owner, postId) => {
    let data
    switch (type) {
        case 'background':
            data = await unsplash.photos.getRandomPhoto({ orientation: 'landscape' })
            break
        case 'avatar':
            data = await unsplash.photos.getRandomPhoto({ query: 'person' })
            break
        default:
            data = await unsplash.photos.getRandomPhoto()
            break
    }

    const picture = await toJson(data)

    const newImage = new Image({
        urls: {
            thumbnail: picture.urls.thumb,
            small: picture.urls.thumb,
            medium: picture.urls.small,
            large: picture.urls.regular,
        },
        createdAt: new Date().toISOString(),
        author: {
            name: picture.user.name,
            link: picture.user.links.self,
        },
        uploadedBy: owner,
        post: postId,
    })
    return await newImage.save()
}
