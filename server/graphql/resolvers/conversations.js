const { AuthenticationError, UserInputError, withFilter } = require('apollo-server')
const Conversation = require('../../models/Conversation')
const User = require('../../models/User')
const Image = require('../../models/Image')
const { ObjectId } = require('mongodb')
const checkAuth = require('../../utils/checkAuth')

const { paginateResult } = require('./methods/cursorPagination')

module.exports = {
    Mutation: {
        createConversation: async (parent, { users }, context) => {
            const user = checkAuth(context)
            if (!user) throw new AuthenticationError('You must be logged in to create chat')

            // if exists return that conversation
            const conversation = await Conversation.findOne({
                $and: [
                    ...users.map((u) => ({ users: u })),
                    { users: user.id },
                    { users: { $size: users.length + 1 } },
                ],
            })
            if (conversation) {
                return conversation
            }

            const newConversation = new Conversation({
                users: [...users, user.id],
                messages: [],
            })
            return await newConversation.save()
        },
        updateConversation: async (parent, { id, field, newValue }, context) => {
            const user = checkAuth(context)
            if (!user)
                throw new AuthenticationError('You must be logged in to update conversation data')
            if (field === 'mesages')
                throw new Error('please use sendMessage() to add new messages to conversation')
            return await Conversation.findByIdAndUpdate(
                id,
                { [field]: newValue },
                { new: true, useFindAndModify: false }
            )
        },

        sendMessage: async (parent, { conversationId, body }, context) => {
            const user = checkAuth(context)
            try {
                const conversation = await Conversation.findById(conversationId)
                conversation.messages.unshift({
                    body,
                    user: user.id,
                    seenBy: [user.id],
                })

                conversation.newestMessageTimestamp = conversation.messages[0].timestamp

                context.pubsub.publish('MESSAGE_SENT', {
                    newMessage: conversation,
                })

                return await conversation.save()
            } catch (error) {
                return error
            }
        },

        markLastMessagesSeen: async (parent, { conversationId }, context) => {
            const user = checkAuth(context)
            try {
                const conversation = await Conversation.findById(conversationId)
                conversation.messages.forEach((message) => {
                    if (!message.seenBy.includes(user.id)) message.seenBy.push(user.id)
                })
                return await conversation.save()
            } catch (e) {
                throw e
            }
        },
    },
    Query: {
        conversationIdByUser: async (parent, { userId }, context) => {
            const { id: user } = checkAuth(context)
            const conversation = await Conversation.findOne({
                $and: [{ users: userId }, { users: user }, { users: { $size: 2 } }],
            })
            return conversation ? conversation._id : null
        },
        conversation: async (parent, { id }, context) => {
            try {
                return await Conversation.findById(id)
            } catch (error) {
                return error
            }
        },
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                (parent, variables, context) => {
                    try {
                        const user = checkAuth(context)
                        return context.pubsub.asyncIterator(['MESSAGE_SENT'])
                    } catch (error) {
                        return error
                    }
                },
                ({ newMessage: conversation }, variables) =>
                    conversation.users.includes(variables.user)
            ),
        },
    },
    Conversation: {
        messages: ({ messages }, { paginationData }) => {
            try {
                return paginateResult({}, paginationData, messages)
            } catch (error) {
                return error
            }
        },
        users: async ({ users }) => {
            try {
                return await User.find({ _id: users })
            } catch (e) {
                return e
            }
        },
        image: async ({ image, users }, variables, context) => {
            try {
                if (image) {
                    return await Image.findById(image)
                } else {
                    const contextUser = checkAuth(context)
                    const otherUserId = users.filter((id) => id.toString() !== contextUser.id)[0]
                    const { profileImage } = await User.findById(otherUserId)
                    return await Image.findById(profileImage)
                }
            } catch (e) {
                return e
            }
        },
        newestMessageTimestamp: ({ messages: [newest], newestMessageTimestamp }) => {
            // or messages.reduce((prev, curr)=> return prev.timestamp > curr.timestamp ? prev : curr)
            if (newestMessageTimestamp) return newestMessageTimestamp
            return newest ? newest.timestamp : null
        },
        name: async ({ name, users }, vars, context) => {
            if (name) return name

            const contextUser = checkAuth(context)
            const otherUsersIds = users.filter((user) => user.toString() !== contextUser.id)
            const otherUsers = (await User.find({ _id: otherUsersIds })).map((usr) => usr.username)
            return otherUsers
        },
    },
    Message: {
        user: async ({ user }) => {
            try {
                return await User.findById(user)
            } catch (error) {
                return error
            }
        },
        seenBy: async ({ seenBy }) => {
            try {
                return await User.find({ _id: seenBy })
            } catch (error) {
                return error
            }
        },
    },
}
