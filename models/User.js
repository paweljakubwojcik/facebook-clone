const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,  // required i s handled by GraphQL
    password: String,
    email: String,
    createdAt: String,
    info: {
        joiningDate: String,
        birthDate: String,
        age: Number,
        sex: String,
        description: String,
        location: String,
        job: String,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    invitations: [
        {
            from: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            date: String
        }
    ],
    notifications: [
        {
            body: String,
            createdAt: String,
            isSeen: Boolean,
            from: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
        }
    ],
    profileImage: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    },
    backgroundImage: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    },
    isOnline: Boolean,
    lastTimeOnline: String,
    conversations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'conversations'
        }
    ],
    settings: {
        preferredTheme: String,
        postDefaultPrivacy: String,
    }

})

module.exports = model('User', userSchema)