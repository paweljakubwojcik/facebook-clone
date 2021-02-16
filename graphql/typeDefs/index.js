const { gql } = require('apollo-server')

const posts = require('./posts')
const image = require('./image')
const notification = require('./notification')
const user = require('./user')

//setting up GraphQL
const index = gql`

    type Query

    type Mutation
        
 `

 module.exports = [index, posts, image, user, notification]



