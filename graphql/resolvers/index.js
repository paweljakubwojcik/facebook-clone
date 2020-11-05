const postsResorvels = require('./posts')
const usersResorvels = require('./users')
const commentsResorvels = require('./comments')

module.exports = {
    Post: {
        commentsCount: (parent) => parent.comments.length,
        likesCount: (parent) => parent.likes.length,
    },
    Query: {
        ...postsResorvels.Query,
        ...commentsResorvels.Query
    },
    Mutation: {
        ...usersResorvels.Mutation,
        ...postsResorvels.Mutation,
        ...commentsResorvels.Mutation
    }
}