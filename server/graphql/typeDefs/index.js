const { gql } = require('apollo-server')

//setting up GraphQL
const index = gql`
    type Query

    type Mutation

    enum SortDirection {
        ASCENDING
        DESCENDING
    }

    input CursorBasedPagination {
        limit: Int
        cursor: ID
        sortBy: String
        sort: SortDirection
    }
`

module.exports = [
    index,
    require('./posts'),
    require('./image'),
    require('./notification'),
    require('./user'),
    require('./entity'),
]
