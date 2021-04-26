const { model, Schema } = require('mongoose')

const conversationSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            id: {
                type: Schema.Types.ObjectId,
                auto: true,
                required: true,
            },
            body: String,
            timestamp: {
                type: Number,
                default: Date.now,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            isSeen: {
                type: Boolean,
                default: false,
            },
        },
    ],
})

module.exports = model('Conversation', conversationSchema)
