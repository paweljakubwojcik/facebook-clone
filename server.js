const mongoose = require('mongoose')

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload-minimal')

const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')

require('dotenv').config()

const app = express()

//setting up apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }), //so we have req.body inside the context argument in resolver
})

server.applyMiddleware({ app })

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })) //  make sure to add a semicolumn before IIFE's
;(async () => {
    try {
        //connecting to DB
        await mongoose.connect(process.env.MONGODB_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`\x1b[94mMongo connected \x1b[39m`)

        // starting up a server
        app.listen({ port: process.env.PORT }, () => {
            console.log(`server running at ${process.env.URL}:${process.env.PORT}`)
            console.log(`graphql playground at ${process.env.URL}:${process.env.PORT}/graphql`)
        })
    } catch (error) {
        console.error("\x1b[31m couldn't connect to Mongo Database  \x1b[89m")
    }
})()
