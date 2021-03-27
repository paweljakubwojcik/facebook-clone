const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String, // required i s handled by GraphQL
    password: String,
    email: String,
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
    timestamp: {
        type: Number,
        default: Date.now(),
    },
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
            ref: 'users',
        },
    ],
    invitations: [
        {
            from: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            timestamp: {
                type: Number,
                default: Date.now(),
            },
        },
    ],
    notifications: [
        {
            body: String,
            createdAt: {
                type: String,
                default: new Date().toISOString(),
            },
            timestamp: {
                type: Number,
                default: Date.now(),
            },
            isSeen: {
                type: Boolean,
                default: false,
            },
            from: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
        },
    ],
    profileImage: {
        type: Schema.Types.ObjectId,
        ref: 'images',
    },
    backgroundImage: {
        type: Schema.Types.ObjectId,
        ref: 'images',
    },
    conversations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'conversations',
        },
    ],
    settings: {
        preferredTheme: String,
        postDefaultPrivacy: String,
    },
})

module.exports = model('User', userSchema)
