const postsResorvels = require('./posts')
const usersResorvels = require('./users')

module.exports = {
    Query: {
        ...postsResorvels.Query
    },
    Mutation: {
        ...usersResorvels.Mutation
    }
}