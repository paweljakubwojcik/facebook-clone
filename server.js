const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose')


const { MONGODB_KEY } = require('./config')
const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')


//setting up apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }) //so we have req.body inside the context argument in resolver
})




    ;   //  make sure to add a semicolumn before IIFE's
(async () => {
    //connecting to DB
    await mongoose.connect(MONGODB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`Mongo connected`)

    // starting up a server
    const res = await server.listen({ port: 5000 })
    console.log(`server running at ${res.url}`)
})()