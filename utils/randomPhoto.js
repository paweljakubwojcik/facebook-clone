const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const fetch = require('node-fetch');
global.fetch = fetch;
const APP_ACCESS_KEY = require('../config.js').UNSPLASH_APP_KEY


const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

module.exports.getRandomPhoto = async () => {
    const data = await unsplash.photos.getRandomPhoto({ orientation: 'landscape' })
    const picture = await toJson(data)
    return await picture.urls.regular;

}