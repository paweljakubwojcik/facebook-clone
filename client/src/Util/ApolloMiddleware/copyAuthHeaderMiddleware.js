// hack for generating dynamicly token in subscriptions
const copyAuthHeaderMiddleware = {
    applyMiddleware: function (options, next) {
        // Get the current context
        const context = options.getContext()
        console.log(context)
        // set it on the `options` which will be passed to the websocket with Apollo
        // Server it becomes: `ApolloServer({contetx: ({payload}) => (returns options)
        options.authorization = context.headers.authorization
        next()
    },
}

export default copyAuthHeaderMiddleware
