const jwt = require('jsonwebtoken')

module.exports.authenticateWebsockets = ({ authorization }, webSocket) => {
    try {
        console.log('authenticate')
        if (authorization) {
            const user = jwt.verify(authorization, process.env.SECRET_KEY)
            if (!user) throw new AuthenticationError('Invalid/Expired token')
            console.log(user.username)
            return true
        } else {
            console.log('nope')
            throw new Error('Missing auth token!')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
