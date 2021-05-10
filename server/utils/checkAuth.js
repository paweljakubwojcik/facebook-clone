const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

/**
 * Checking if the validation token is valid, if so returns a User object
 * if not, throws an Error
 * @param {Object} context - an object provided by apollo server
 * @returns {Object} validated user
 */
module.exports = ({ req, connection }) => {
    //context = {... headers}
    let authHeader
    if (req) authHeader = req.headers.authorization
    if (connection) authHeader = connection.context.authorization
    if (authHeader) {
        // tokens are transported like "...Bearer <Token>...""
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY)
                return user
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error("Authentication token must be 'Bearer [toket]")
    }
    throw new Error('Authentication header must be provided')
}
