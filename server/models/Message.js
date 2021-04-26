const { model, Schema } = require('mongoose')

const messageSchema = new Schema({
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
})

module.exports = model('Conversation', messageSchema)
