const postsResorvels = require('./posts')
const usersResorvels = require('./users')
const commentsResorvels = require('./comments')
const imagesResolvers = require('./images')

module.exports = {
    Post: {
        commentsCount: (parent) => parent.comments.length,
        likesCount: (parent) => parent.likes.length,
        ...postsResorvels.Post
    },
    Comment: {
        likesCount: (parent) => parent.likes.length,
        ...commentsResorvels.Comment
    },
    User: {
        ...usersResorvels.User,
        notificationCount: (parent) => parent.notifications.filter(n => !n.isSeen).length + parent.invitations.filter(n => !n.isSeen).length,
    },
    Invitation: {
        ...usersResorvels.Invitation,
    },
    Notification:{
        ...usersResorvels.Notification,
    },
    Image: {
        ...imagesResolvers.Image,
        ...imagesResolvers.Urls
    },
    Query: {
        ...postsResorvels.Query,
        ...commentsResorvels.Query,
        ...usersResorvels.Query,
        ...imagesResolvers.Query
    },
    Mutation: {
        ...usersResorvels.Mutation,
        ...postsResorvels.Mutation,
        ...commentsResorvels.Mutation,
        ...imagesResolvers.Mutation
    }
}