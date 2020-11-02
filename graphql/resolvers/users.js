
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

const User = require('../../models/User')

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
        { expiresIn: '1h' })
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
            //when user isnt found
            if (!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = 'Wrong password'
                throw new UserInputError('Wrong password', { errors })
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user doesn't already exist 
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
                createdAt: new Date().toISOString()
            })
            //saving user in DB  //TODO error handling? 
            const res = await newUser.save()

            //creating validation token
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}