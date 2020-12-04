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
        ...usersResorvels.User
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