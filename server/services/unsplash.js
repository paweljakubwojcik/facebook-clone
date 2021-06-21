const Unsplash = require('unsplash-js').default
const { toJson } = require('unsplash-js')
global.fetch = require('node-fetch')

const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_APP_KEY })

/**
 *
 * @param {String} type - 'background' || 'avatar'
 */

module.exports.generateRandomPhoto = async (type) => {
    let data
    try {
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
    } catch (error) {
        console.log(error)
        throw error
    }

    const picture = await toJson(data)

    return {
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
        storageProvider: 'UNSPLASH',
    }
}

/**
 *
 * @returns {Promise<{urls: { thumbnail: string, small: string, medium: string, large: string, }, createdAt: string, author: {name: string,link: string,},storageProvider: string,}>}
 */
module.exports.getImageOfTheDay = async () => {
    try {
        const picture = await unsplash.photos
            .getRandomPhoto({
                query: 'community',
                orientation: 'portrait',
            })
            .then((data) => toJson(data))

        return {
            urls: {
                thumbnail: picture.urls.thumb,
                small: picture.urls.thumb,
                medium: picture.urls.small,
                large: picture.urls.regular,
            },
            createdAt: new Date().toISOString(),
            author: {
                name: picture.user.name,
                link: picture.user.links.html,
            },
            storageProvider: 'UNSPLASH',
        }
    } catch (error) {
        throw error
    }
}
