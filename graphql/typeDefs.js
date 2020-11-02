const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`

    type Post{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
    }
    type Query{
        getPosts:[Post]
    }
 `