
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const { validateRegisterInput } = require('../../utils/validators')

const User = require('../../models/User')


module.exports = {
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            //TODO validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // TODO Make sure user doesn't already exist
            const user = await User.findOne({ username })
            if (user) {
                //specific error from apollo server
                throw new UserInputError('Username is taken', {
                    //payloads for front end to display messages
                    errors: {
                        username: 'This username is taken'
                    }
                })
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
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username,
            }, SECRET_KEY, { expiresIn: '1h' })

            //returning query
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        }
    }
}