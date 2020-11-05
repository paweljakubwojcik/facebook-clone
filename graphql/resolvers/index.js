const postsResorvels = require('./posts')
const usersResorvels = require('./users')
const commentsResorvels = require('./comments')

module.exports = {
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