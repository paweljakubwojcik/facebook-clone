const { model, Schema } = require('mongoose')

const conversationSchema = new Schema({
    name: String,
    newestMessageTimestamp: Number,
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    },
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
            seenBy: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
        },
    ],
})

module.exports = model('Conversation', conversationSchema)
