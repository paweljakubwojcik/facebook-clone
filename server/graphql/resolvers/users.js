const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')
const { createWelcomePost } = require('./methods/createWelcomePost')
const { generateRandomPhoto } = require('../../services/unsplash')
const { paginateResult, getPaginatedResult } = require('./methods/cursorPagination')
const checkAuth = require('../../utils/checkAuth')
const generateToken = require('../../utils/generateToken')
const { asyncFilter } = require('../../utils/asyncFilter')

const User = require('../../models/User')
const Image = require('../../models/Image')
const Entity = require('../../models/Entity')
const Conversation = require('../../models/Conversation')
const getPrivacyFilter = require('./methods/getPrivacyFilter')
const { validateGoogleUser } = require('../../services/googleAuth')
const generateImageFromGoogleAuth = require('./methods/generateImageFromGoogleAuth')
const conversations = require('./conversations')

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password)
            //when inputs are not valid
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            //finding user in DB
            const user = await User.findOne({ username })
            if (!user) {
                //when user isnt found
                errors.username = 'User not found'
                throw new UserInputError('User not found', { errors })
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                //when password is invalid
                errors.password = 'Wrong password'
                throw new UserInputError('Wrong password', { errors })
            }
            const token = generateToken(user)
            const res = await user.save()
            return {
                ...user._doc,
                id: user._id,
                token,
            }
        },
        async register(
            _,
            { registerInput: { username, email, password, confirmPassword } },
            context,
            info
        ) {
            // validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            )
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user with same username or email doesn't already exist
            const user = await User.findOne({ $or: [{ username }, { email }] })
            if (user) {
                if (user.username === username) {
                    //specific error from apollo server
                    throw new UserInputError('Username is taken', {
                        //payloads for front end to display messages
                        errors: {
                            username: 'This username is taken',
                        },
                    })
                }
                if (user.email === email) {
                    //specific error from apollo server
                    throw new UserInputError('Email already registered', {
                        //payloads for front end to display messages
                        errors: {
                            email: 'Email already registered, forgot password?',
                        },
                    })
                }
            }
            try {
                // hash password & create auth token
                password = await bcrypt.hash(password, 12)
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString(),
                    friends: [],
                    conversations: [],
                    notifications: [],
                    invitations: [],
                    settings: {
                        preferredTheme: null,
                        postDefaultPrivacy: 'PUBLIC',
                    },
                    info: {
                        joiningDate: new Date().toLocaleDateString(),
                        birthDate: null,
                        sex: null,
                        description: null,
                        location: null,
                        job: null,
                    },
                })
                const { _id } = await newUser.save()

                //generate random backgroundImage and avatar pic
                const backgroundImage = new Image({
                    ...(await generateRandomPhoto('background')),
                    uploadedBy: _id,
                    role: 'BACKGROUND',
                })
                const profileImage = new Image({
                    ...(await generateRandomPhoto('avatar')),
                    uploadedBy: _id,
                    role: 'PROFILE',
                })

                newUser.backgroundImage = await backgroundImage.save()
                newUser.profileImage = await profileImage.save()

                //saving user in DB
                const res = await newUser.save()

                //console.log({ res })

                //creating validation token
                const token = generateToken(res)
                return {
                    ...res._doc,
                    id: res._id,
                    token,
                }
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async loginWithGoogle(_, { code }) {
            // if email is taken merge accounts => add providers to list
            // if user already exist => return user
            //     then check for data update i.e profile picture
            // else => create user
            try {
                const googleData = await validateGoogleUser(code)

                let user = await User.findOne({ email: googleData.email })
                if (user) {
                    if (user.providers)
                        if (!user.providers.includes('Google')) {
                            user.providers.push('Google')
                            user = await user.save()
                        }
                    //checking for updates from google (changed profile picture)
                } else {
                    // create user
                    const newUser = new User({
                        email: googleData.email,
                        username: googleData.name,
                        createdAt: new Date().toISOString(),
                        settings: {
                            preferredTheme: null,
                            postDefaultPrivacy: 'PUBLIC',
                        },
                        info: {
                            joiningDate: new Date().toLocaleDateString(),
                            birthDate: null,
                            sex: null,
                            description: null,
                            location: null,
                            job: null,
                        },
                        authProviders: ['Google'],
                    })
                    const { _id } = await newUser.save()

                    //generate random backgroundImage and avatar pic
                    const backgroundImage = new Image({
                        ...(await generateRandomPhoto('background')),
                        uploadedBy: _id,
                        role: 'BACKGROUND',
                    })
                    const profileImage = new Image({
                        ...generateImageFromGoogleAuth(googleData),
                        uploadedBy: _id,
                        role: 'PROFILE',
                    })

                    newUser.backgroundImage = await backgroundImage.save()
                    newUser.profileImage = await profileImage.save()
                    //saving user in DB
                    user = await newUser.save()
                }
                const token = generateToken(user)

                return {
                    ...user._doc,
                    id: user._id,
                    token,
                }
            } catch (e) {
                return e
            }
        },
        async updateSettings(_, { setting, newValue }, context, info) {
            const { id } = checkAuth(context)
            const user = await User.findById(id)
            user.settings = { ...user.settings, [setting]: newValue }
            return await user.save()
        },
        async updateUser(_, { field, newValue }, context) {
            const { id } = checkAuth(context)
            const user = await User.findByIdAndUpdate(
                id,
                { [field]: newValue },
                { new: true, useFindAndModify: false }
            )
            return user
        },
        async updateUserInfo(_, { field, newValue }, context) {
            try {
                const { id } = checkAuth(context)
                const user = await User.findById(id)
                user.info[field] = newValue
                return user.save()
            } catch (error) {
                return error
            }
        },
        async inviteUser(_, { userId }, context) {
            const { id: invitatorId } = checkAuth(context)

            try {
                const user = await User.findById(userId)
                const invitator = await User.findById(invitatorId)
                user.invitations.push({
                    from: invitator.id,
                })
                user.notifications.push({
                    from: invitator.id,
                    body: `$user wants to become your fake friend!`,
                    type: 'INVITATION',
                })
                return await user.save()
            } catch (error) {
                return error
            }
        },
        async answerInvitation(_, { from, answer }, context) {
            const user = checkAuth(context)
            try {
                const invitator = await User.findById(from)
                const invitee = await User.findById(user.id)
                //deleting notification related to invitation
                invitee.notifications = invitee.notifications.filter(
                    (n) => !(n.type === 'INVITATION' && n.from.toString() === from)
                )
                const response = []
                switch (answer) {
                    case 'ACCEPT':
                        //push invitator to friendlist of invitee
                        if (!invitee.friends.includes(invitator.id)) invitee.friends.push(invitator)
                        //and vice versa
                        if (!invitator.friends.includes(invitee.id)) invitator.friends.push(invitee)

                        // != because 'inv.from' has diffrent type than 'from'
                        const filteredInv = invitee.invitations.filter(
                            (inv) => inv.from.toString() !== from
                        )
                        invitee.invitations = filteredInv

                        invitator.notifications.unshift({
                            from: invitee.id,
                            body: `$user has accepted you as a fake friend!`,
                        })

                        invitee.notifications.unshift({
                            from: invitator.id,
                            body: `You and $user have became friends!`,
                        })

                        response.push(await invitee.save())
                        response.push(await invitator.save())
                        return response

                    case 'DECLINE':
                        invitee.invitations = invitee.invitations.filter((inv) => inv.from != from)

                        invitator.notifications.unshift({
                            from: invitee.id,
                            body: `$user has declined your friendship request`,
                        })
                        response.push(await invitee.save())
                        response.push(await invitator.save())
                        return response

                    default:
                        break
                }
            } catch (error) {
                console.log(error)
                return error
            }
        },
        deleteFriend: async (_, { userId }, context) => {
            const { id } = checkAuth(context)
            try {
                const user = await User.findById(userId)
                const user2 = await User.findById(id)

                user.friends = user.friends.filter((friend) => friend.toString() !== id)
                user2.friends = user2.friends.filter((friend) => friend.toString() !== userId)

                await user.save()
                return await user2.save()
            } catch (error) {
                return error
            }
        },
    },
    Query: {
        users: async (_, { limit }, context) => {
            try {
                const { id } = checkAuth(context)
                const user = await User.findById(id)
                /* const users = await getPaginatedResult({ _id: user.friends }, paginationData, User) */
                /* const users = await getPaginatedResult({}, paginationData, User) */
                const users = User.find({}, null, { limit })
                return users
            } catch (err) {
                throw new Error(err)
            }
        },
        user: async (parent, { userId }) => {
            try {
                const user = await User.findById(userId)
                return user
            } catch (err) {
                try {
                    const user = await User.findOne({ username: userId })
                    if (!user) return new Error('user not found')
                    else return user
                } catch (error) {
                    throw new Error(err)
                }
            }
        },
        searchForUser: async (parent, { query, limit = 5, offset = 0 }) => {
            try {
                if (query.trim() === '') return []
                let foundUsers = []

                const initialIndexBack = query.length
                const maxDepth = 5
                let indexBack = initialIndexBack
                while (
                    foundUsers.length === 0 &&
                    indexBack !== 0 &&
                    initialIndexBack - indexBack < maxDepth
                ) {
                    foundUsers = foundUsers.concat(
                        await User.find({
                            username: { $regex: query.slice(0, indexBack) },
                        })
                    )
                    indexBack--
                }
                return foundUsers.slice(offset, offset + limit)
            } catch (error) {
                throw error
            }
        },
        getFriendshipStatus: async (_, { withUser }, context) => {
            try {
                const { id } = checkAuth(context)
                const user = await User.findById(withUser)

                if (user.friends.find((friend) => friend.toString() === id)) return 'FRIEND'
                if (user.invitations.find((inv) => inv.from.toString() === id)) return 'INVITED'

                const contextUser = await User.findById(id)
                if (contextUser.invitations.find((inv) => inv.from.toString() === user.id))
                    return 'INVITING'

                return 'NOT_FRIEND'
            } catch (error) {
                throw error
            }
        },
    },
    User: {
        profileImage: async ({ profileImage }) => {
            return await Image.findById(profileImage)
        },
        backgroundImage: async ({ backgroundImage }) => {
            return await Image.findById(backgroundImage)
        },
        images: async ({ id }, variables, context) => {
            // get all images
            const images = await Image.find({ uploadedBy: id })
            // filter them out
            return await asyncFilter(images, async (img) => {
                if (img.role && (img.role === 'BACKGROUND' || img.role === 'PROFILE')) return true
                const filter = await getPrivacyFilter({
                    context,
                    initialFilter: { _id: img.post },
                })
                return await Entity.exists(filter)
            })
        },
        friends: async ({ friends }) => {
            const data = await Promise.all(friends.map((friend) => User.findById(friend)))
            return data
        },
        notifications: async ({ id }, { paginationData }, context) => {
            try {
                const user = await User.findById(id)
                notifications = paginateResult({}, paginationData, user.notifications)
                return notifications
            } catch (error) {
                return error
            }
        },
        conversations: async ({ id }, { paginationData }, context) => {
            try {
                const conversations = await getPaginatedResult(
                    { users: id, 'messages.0': { $exists: true } },
                    paginationData,
                    Conversation
                )
                return conversations
            } catch (error) {
                return error
            }
        },
        notificationCount: (parent) => parent.notifications.filter((n) => !n.isSeen).length,
        messagesCount: async ({ id }) => {
            const conversations = await Conversation.find({ users: id })
            return conversations.filter(
                (c) => c.messages.filter((m) => !m.seenBy.includes(id)).length !== 0
            ).length
        },
    },
    Invitation: {
        from: async ({ from }) => {
            return await User.findById(from)
        },
    },
}
