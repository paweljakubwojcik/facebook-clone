const postsResorvels = require('./posts')
const usersResorvels = require('./users')
const commentsResorvels = require('./comments')
const imagesResolvers = require('./images')
const notificationsResolvers = require('./notifications')
const entitiesResolvers = require('./entities')

module.exports = {
    Entity: {
        ...entitiesResolvers.Entity,
    },
    Post: {
        commentsCount: (parent) => parent.comments.length,
        reactionsCount: (parent) => parent.reactions.length,
        ...postsResorvels.Post,
    },
    Reaction: {
        ...entitiesResolvers.Reaction,
    },
    Comment: {
        reactionsCount: (parent) => parent.reactions.length,
        ...commentsResorvels.Comment,
    },
    User: {
        ...usersResorvels.User,
        notificationCount: (parent) =>
            parent.notifications.filter((n) => !n.isSeen).length +
            parent.invitations.filter((n) => !n.isSeen).length,
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
    },
    Mutation: {
        ...usersResorvels.Mutation,
        ...postsResorvels.Mutation,
        ...commentsResorvels.Mutation,
        ...imagesResolvers.Mutation,
        ...notificationsResolvers.Mutation,
        ...entitiesResolvers.Mutation,
    },
}
