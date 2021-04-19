const jwt = require('jsonwebtoken')

/**
 *
 * @param {Object} user user for which session token is generated
 * @returns token
 */
module.exports = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        process.env.SECRET_KEY
    )
}
