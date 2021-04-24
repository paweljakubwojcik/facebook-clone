const { model, Schema } = require('mongoose')

const imageSchema = new Schema({
    title: String,
    filename: String,
    urls: {
        large: String,
        medium: String,
        small: String,
        thumbnail: String,
    },
    createdAt: String,
    timestamp: {
        type: Number,
        default: Date.now,
    },
    author: {
        name: String,
        link: String,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts',
    },
    storageProvider: {
        type: String,
        enum: ['FIREBASE_STORAGE', 'GOOGLE_AUTH', 'UNSPLASH'],
    },
})

module.exports = model('Image', imageSchema)
