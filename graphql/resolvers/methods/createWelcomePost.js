const Entity = require('../../../models/Entity')

const randomTexts = [
    'Check out my new fake pictures',
    'Those are my first pictures, uploaded automatically',
    'My random generated pictures from Unsplash.com',
    'Really nice photos, check out the authors',
]

/**
 *
 * @param {Object} user - mongo document
 */
module.exports.createWelcomePost = (userId) => {
    try {
        //creating post associated with pictures
        const newPost = new Entity({
            user: userId,
            type: 'POST',
            privacy: 'PRIVATE',
            body: randomTexts[Math.floor(Math.random() * randomTexts.length)],
            createdAt: new Date().toISOString(),
            reactions: [],
            children: [],
            images: [],
            isDeletable: true,
        })

        return newPost
    } catch (e) {
        return e
    }
}
