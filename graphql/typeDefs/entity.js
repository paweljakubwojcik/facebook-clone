const { gql } = require('apollo-server')

module.exports = gql`
    enum ReactionType {
        LIKE
        LOVE
        CARE
        HAHA
        WOW
        SAD
        ANGRY
    }

    type Reaction {
        id: ID!
        createdAt: String!
        timestamp: Int!
        user: User!
        type: ReactionType
    }

    interface Entity {
        id: ID!
        createdAt: String!
        timestamp: Int!
        user: User!
        body: String
        reactions: [Reaction]!
        reactionsCount: Int!
    }

    extend type Query {
        entities: [Entity]
    }

    extend type Mutation {
        react(id: ID!, type: ReactionType!): Entity!
        delete(id: ID): String!
    }
`