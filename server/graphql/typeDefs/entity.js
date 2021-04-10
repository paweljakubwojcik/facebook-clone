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
        timestamp: Float!
        user: User!
        type: ReactionType
    }

    interface Entity {
        id: ID!
        createdAt: String!
        timestamp: Float!
        user: User!
        body: String
        reactions: [Reaction]!
        reactionsCount: Int!
        images: [Image]
    }

    extend type Query {
        entities: [Entity]
        entity(id: ID!): Entity
    }

    extend type Mutation {
        react(id: ID!, type: ReactionType!): Entity!
        delete(id: ID): Entity!
    }
`
