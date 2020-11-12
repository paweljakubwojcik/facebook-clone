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
    profileImage: String,
    isOnline: Boolean,
    lastTimeOnline: String
})

module.exports = model('User', userSchema)