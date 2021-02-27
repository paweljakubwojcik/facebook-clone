const { model, Schema } = require('mongoose')

const reaction = {
    createdAt: String,
    timestamp: Number,
    type: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
}

const postSchema = new Schema({
    body: String,
    title: String,
    createdAt: String,
    timestamp: Number,
    privacy: String,
    isDeletable: Boolean,
    isEdited: Boolean,
    comments: [
        {
            body: String,
            createdAt: String,
            timestamp: Number,
            isEdited: Boolean,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            reactions: [reaction],
        },
    ],
    reactions: [reaction],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'images',
        },
    ],
})

module.exports = model('Post', postSchema)
