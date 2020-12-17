
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')
const { generateRandomPhoto } = require('../../utils/randomPhoto')
const checkAuth = require('../../utils/checkAuth')

const User = require('../../models/User')
const Image = require('../../models/Image')
const Post = require('../../models/Post')

/**
 * 
 * @param {Object} user user for which session token is generated
 * @returns token
 */
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        SECRET_KEY,
        { expiresIn: '2h' })
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            //when inputs are not valid
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            //finding user in DB
            const user = await User.findOne({ username })
            if (!user) { //when user isnt found
                errors.username = 'User not found'
                throw new UserInputError('User not found', { errors })
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) { //when password is invalid
                errors.password = 'Wrong password'
                throw new UserInputError('Wrong password', { errors })
            }
            const token = generateToken(user)
            //actualize user info
            user.isOnline = true
            user.lastTimeOnline = new Date().toISOString()
            const res = await user.save()
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async logout(_, { userId }) {
            try {
                const user = await User.findById(userId)
                user.isOnline = false
                const res = await user.save()
                return 'logged out'
            } catch (error) {
                throw new Error(error)
            }

        },

        async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
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
                            username: 'This username is taken'
                        }
                    })
                }
                if (user.email === email) {
                    //specific error from apollo server
                    throw new UserInputError('Email already registered', {
                        //payloads for front end to display messages
                        errors: {
                            email: 'Email already registered, forgot password?'
                        }
                    })
                }
            }
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
                    prefferedTheme: null,
                    postDefaultPrivacy: null
                },
                info: {
                    joiningDate: new Date().toLocaleDateString(),
                    birthDate: null,
                    sex: null,
                    description: null,
                    location: null,
                    job: null,
                },
                lastTimeOnline: new Date().toISOString(),
            })
            //saving user in DB  //TODO error handling? 
            const { _id } = await newUser.save()

            const randomTexts = [
                "Check out my new fake pictures",
                "Those are my first pictures, uploaded automatically",
                "My random generated pictures from Unsplash.com",
                "Really nice photos, check out the authors",
            ]
            //creating post associated with pictures
            const newPost = new Post({
                user: _id,
                username,
                body: randomTexts[Math.floor(Math.random() * randomTexts.length)],
                createdAt: new Date().toISOString(),
                likes: [],
                comments: [],
                isDeletable: false,
            })

            const { _id: postId } = await newPost.save()

            //generate random backgroundImage and avatar pic
            const backgroundImage = await generateRandomPhoto('background', _id, postId)
            const profileImage = await generateRandomPhoto('avatar', _id, postId)

            newUser.backgroundImage = backgroundImage
            newUser.profileImage = profileImage

            //saving user in DB
            const res = await newUser.save()

            //creating validation token
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
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
            const user = await User.findByIdAndUpdate(id, { [field]: newValue }, { new: true, useFindAndModify: false })
            console.log(user)
            return user
        }
    },
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find().sort({ lastTimeOnline: -1 }); //Get users and sort them by activity
                return users
            } catch (err) {
                throw new Error(err)
            }
        },
        getUser: async (parent, { userId }) => {
            try {
                const user = await User.findById(userId)
                return user
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    User: {
        profileImage: async ({ profileImage }) => {
            return await Image.findById(profileImage)
        },
        backgroundImage: async ({ backgroundImage }) => {
            return await Image.findById(backgroundImage)
        },
        images: async ({ id }) => {
            return await Image.find({ uploadedBy: id })
        }
    }

}