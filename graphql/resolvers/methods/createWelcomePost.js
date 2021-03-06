const { generateRandomPhoto } = require('../../../utils/randomPhoto')
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
module.exports.createWelcomePost = async (user) => {

    console.log(user)

    //creating post associated with pictures
    const newPost = new Entity({
        user: user._id,
        privacy: 'PRIVATE',
        body: randomTexts[Math.floor(Math.random() * randomTexts.length)],
        createdAt: new Date().toISOString(),
        reactions: [],
        children: [],
        images: [],
        isDeletable: true,
    })

    const { _id: postId } = await newPost.save()

    //generate random backgroundImage and avatar pic
    const backgroundImage = await generateRandomPhoto('background', _id, postId)
    const profileImage = await generateRandomPhoto('avatar', _id, postId)

    user.backgroundImage = backgroundImage
    user.profileImage = profileImage
    newPost.images = [backgroundImage._id, profileImage._id]
    await newPost.save()
}
