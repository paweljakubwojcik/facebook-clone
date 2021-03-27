const checkAuth = require('../../utils/checkAuth')

const User = require('../../models/User')


const dayjs = require('dayjs')
dayjs().format()

module.exports = {
    Mutation: {
        markNotificationSeen: async (_, { notificationId }, context) => {
            const { id } = checkAuth(context)
            try {
                const user = await User.findById(id)
                const index = user.notifications.findIndex((n) => n.id === notificationId)
                user.notifications[index].isSeen = true
                return await user.save()
            } catch (error) {
                return error
            }
        },
        deleteNotification: async (_, { notificationId }, context) => {
            const { id } = checkAuth(context)
            try {
                const user = await User.findById(id)
                const filtered = user.notifications.filter((n) => n.id !== notificationId)
                user.notifications = filtered
                return await user.save()
            } catch (error) {
                return error
            }
        },
    },
    Notification: {
        from: async ({ from }) => {
            return await User.findById(from)
        },
    },
}
