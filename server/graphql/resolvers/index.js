const postsResorvels = require('./posts')
const usersResorvels = require('./users')
const commentsResorvels = require('./comments')
const imagesResolvers = require('./images')
const notificationsResolvers = require('./notifications')
const entitiesResolvers = require('./entities')
const conversationsResolvers = require('./conversations')

module.exports = {
    ...conversationsResolvers,
    Entity: {
        ...entitiesResolvers.Entity,
    },
    Post: {
        ...postsResorvels.Post,
    },
    Reaction: {
        ...entitiesResolvers.Reaction,
    },
    Comment: {
        ...commentsResorvels.Comment,
    },
    User: {
        ...usersResorvels.User,
        notificationCount: (parent) => parent.notifications.filter((n) => !n.isSeen).length,
    },
    Invitation: {
        ...usersResorvels.Invitation,
    },
    Notification: {
        ...notificationsResolvers.Notification,
    },
    Image: {
        ...imagesResolvers.Image,
        ...imagesResolvers.Urls,
    },
    Query: {
        ...postsResorvels.Query,
        ...commentsResorvels.Query,
        ...usersResorvels.Query,
        ...imagesResolvers.Query,
        ...notificationsResolvers.Query,
        ...entitiesResolvers.Query,
        ...conversationsResolvers.Query,
    },
    Mutation: {
        ...usersResorvels.Mutation,
        ...postsResorvels.Mutation,
        ...commentsResorvels.Mutation,
        ...imagesResolvers.Mutation,
        ...notificationsResolvers.Mutation,
        ...entitiesResolvers.Mutation,
        ...conversationsResolvers.Mutation,
    },
    Subscription: {
        ...conversationsResolvers.Subscription,
    },
}
