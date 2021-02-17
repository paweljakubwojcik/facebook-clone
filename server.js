//const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose')

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload-minimal');


const { MONGODB_KEY } = require('./config')
const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')


const app = express()

//setting up apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }) //so we have req.body inside the context argument in resolver
})

server.applyMiddleware({ app })

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

    ;   //  make sure to add a semicolumn before IIFE's
(async () => {
    //connecting to DB
    await mongoose.connect(MONGODB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`Mongo connected`)

    // starting up a server
    app.listen({ port: 5000 }, () => {
        console.log(`server running at http://localhost:${5000}`)
    })

})()