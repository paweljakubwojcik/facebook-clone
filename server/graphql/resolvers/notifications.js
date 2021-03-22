
const checkAuth = require('../../utils/checkAuth')

const User = require('../../models/User')

const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

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
        notifications: async (_, { limit, offset }, context) => {
            try {
                const { id } = checkAuth(context)
                const user = await User.findById(id)
                const notifications = user.notifications.sort(({ createdAt: a }, { createdAt: b }) => {
                    return dayjs(b).unix() - dayjs(a).unix()
                })
                user.notifications = notifications.slice(offset, offset + limit)
                return user
            } catch (error) {
                return error
            }

        }
    },
    Notification: {
        from: async ({ from }) => {
            return await User.findById(from)
        }
    }

}