const { gql } = require('apollo-server')

module.exports = gql`
    type Conversation {
        id: ID!
        users: [User!]
        messages(paginationData: CursorBasedPagination!): [Message]!
        name: String!
    }

    type Message {
        id: ID!
        body: String!
        user: User!
        timestamp: Float!
        isSeen: Boolean!
    }

    extend type Query {
        conversation(id: ID!): Conversation!
        conversationIdByUser(userId: ID!): ID
    }

    extend type Subscription {
        subscribeToConversation(id: ID!): Message!
    }

    extend type Mutation {
        createConversation(users: [ID!]): Conversation!
        updateConversation(id: ID!, field: String!, newValue: String!): Conversation!
        deleteConversation(id: ID!): Conversation
        sendMessage(conversationId: ID!, body: String!): Conversation!
    }
`
