const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose')

const Post = require('./models/Post')
const { MONGODB_KEY } = require('./config')


//setting up GraphQL
const typeDefs = gql`

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

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find(); //Post from mongoose Schemes
                return posts
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}


//setting up apollo
const server = new ApolloServer({
    typeDefs,
    resolvers
})

//connecting to DB
mongoose.connect(MONGODB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Mongo connected`)
        // starting up a server
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`server running at ${res.url}`)
    })