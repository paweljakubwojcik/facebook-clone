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

module.exports = {
    Mutation: {
        markNotificationSeen: async (_, { notificationId }, context) => {
            const { id } = checkAuth(context)
            try {
                const user = await User.findById(id)
                const index = user.notifications.findIndex(n => n.id === notificationId)
                user.notifications[index].isSeen = true
                return await user.save()
            } catch (error) {
                return error
            }
        }
    },
    Query: {
        notifications: async ({ limit, offset }, context) => {
            const { id } = checkAuth(context)
            const user = await User.findById(id)
            const notifications = user.notifications
            user.notifications = notifications.slice(offset, offset + limit)
            return user
        }
    },
    Notification: {
        from: async ({ from }) => {
            return await User.findById(from)
        }
    }

}