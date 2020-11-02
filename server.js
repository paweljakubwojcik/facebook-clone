const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose')


const { MONGODB_KEY } = require('./config')
const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')


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