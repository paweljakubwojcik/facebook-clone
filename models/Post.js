const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    body: String,
    title: String,
    username: String,
    createdAt: String,
    privacy: String,
    isDeletable: Boolean,
    isEdited: Boolean,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
            user: String,
            likes: [
                {
                    username: String,
                    createdAt: String
                }
            ],
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'images'
        }
    ]

})

module.exports = model('Post', postSchema)