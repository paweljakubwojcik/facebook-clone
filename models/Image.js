const { model, Schema } = require('mongoose')

const imageSchema = new Schema({
    urls: {
        large: String,
        medium: String,
        small: String,
    },
    createdAt: String,
    author: {
        name: String,
        link: String,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }
})

module.exports = model('Image', imageSchema)