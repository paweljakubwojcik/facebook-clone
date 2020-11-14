const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,  // required i s handled by GraphQL
    password: String,
    email: String,
    createdAt: String,
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    invitations: [
        {
            username: String,
        }
    ],
    profileImage: {
        large: String,
        medium: String,
        small: String,
    },
    backgroundImage: String,
    isOnline: Boolean,
    lastTimeOnline: String,
    conversations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'conversations'
        }
    ]

})

module.exports = model('User', userSchema)