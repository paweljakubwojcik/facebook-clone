const { gql } = require('apollo-server')

module.exports = gql`
    type Conversation {
        id: ID!
        timestamp: Float
        newestMessageTimestamp: Float
        users: [User!]
        messages(paginationData: CursorBasedPagination!): [Message]!
        name: String
        image: Image!
        unseenNumber: Int
    }

    type Message {
        id: ID!
        conversationId: ID!
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
        newMessage(user: ID!): Conversation
    }

    extend type Mutation {
        createConversation(users: [ID!]): Conversation!
        updateConversation(id: ID!, field: String!, newValue: String!): Conversation!
        deleteConversation(id: ID!): Conversation
        sendMessage(conversationId: ID!, body: String!): Conversation!

        markLastMessagesSeen(conversationId: ID!): Conversation!
    }
`
