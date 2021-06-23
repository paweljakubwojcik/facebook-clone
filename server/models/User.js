const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String, // required i s handled by GraphQL
    password: String,
    email: String,
    createdAt: {
        type: String,
    },
    timestamp: {
        type: Number,
        default: Date.now,
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
                default: Date.now,
            },
        },
    ],
    notifications: [
        {
            body: String,
            createdAt: {
                type: String,
            },
            timestamp: {
                type: Number,
                default: Date.now,
            },
            isSeen: {
                type: Boolean,
                default: false,
            },
            from: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            entity: {
                type: Schema.Types.ObjectId,
                ref: 'entities',
            },
            type: {
                type: String,
            },
        },
    ],
    profileImage: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    },
    backgroundImage: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
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
    authProviders: {
        type: Array,
        default: ['FakeBook'],
    },
})

module.exports = model('User', userSchema)
