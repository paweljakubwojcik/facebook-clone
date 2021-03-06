const { model, Schema } = require('mongoose')

const reaction = {
    createdAt: String,
    timestamp: {
        type: Number,
        default: Date.now,
    },
    type: {
        type: String,
        required: true,
        enum: ['LIKE', 'LOVE', 'CARE', 'HAHA', 'WOW', 'SAD', 'ANGRY'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
}

// TODO: use discriminator
const entitySchema = new Schema({
    body: String,
    title: String,
    createdAt: {
        type: String,
        
    },
    timestamp: {
        type: Number,
        default: Date.now,
    },
    privacy: String,
    isDeletable: Boolean,
    isEdited: Boolean,
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
    parent: {
        type: String,
    },
    children: [
        {
            type: Schema.Types.ObjectId,
            ref: 'entities',
        },
    ],
})

module.exports = model('Entity', entitySchema)
