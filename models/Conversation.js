const { model, Schema } = require('mongoose')

const conversationSchema = new Schema({
    id: String,
    participants: [
        {
            Type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    messages: [
        {
            id: String,
            body: String,
            date: String,
            author: String,
        }
    ]
})

module.exports = model('Conversation', conversationSchema)