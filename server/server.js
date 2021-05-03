require('dotenv').config()
require('./plugins/checkNodeVersion')(12) // checking node version because of uploading files via apollo-file-uploader (works only on 12)
const mongoose = require('mongoose')

const { ApolloServer } = require('apollo-server')
const { PubSub } = require('apollo-server')

const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')
const { requestLogger } = require('./plugins/requestLogger')

const pubsub = new PubSub()

//setting up apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }), //so we have req.body inside the context argument in resolver
    subscriptions: {
        path: '/subscriptions',
    },
    /*  plugins: [requestLogger], */ // for logging requests
})

/* server.applyMiddleware({ app }) */

/* app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })) 
//  make sure to add a semicolumn before IIFE's */
;(async () => {
    try {
        //connecting to DB
        await mongoose.connect(process.env.MONGODB_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`\x1b[94mMongo connected \x1b[39m`)

        // starting up a server
        const { url } = await server.listen({ port: process.env.PORT })
        console.log(`server running at ${url}`)
    } catch (error) {
        console.error("\x1b[31m couldn't connect to Mongo Database  \x1b[89m")
    }
})()
