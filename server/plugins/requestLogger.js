module.exports.requestLogger = {
    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
        console.log(requestContext.request.operationName)
        return {
            // Fires whenever Apollo Server will parse a GraphQL
            // request to create its associated document AST.
            parsingDidStart(requestContext) {
                console.log('Parsing started!')
            },

            // Fires whenever Apollo Server will validate a
            // request's document AST against your GraphQL schema.
            validationDidStart(requestContext) {
                console.log('Validation started!')
            },
        }
    },
}
