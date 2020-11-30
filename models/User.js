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
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    profileImage: {
        large: String,
        medium: String,
        small: String,
    },
    backgroundImage: {
        large: String,
        medium: String,
        small: String,
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'image'
        }
    ],
    isOnline: Boolean,
    lastTimeOnline: String,
    conversations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'conversations'
        }
    ],
    preferences: {
        theme: String,
    }

})

module.exports = model('User', userSchema)