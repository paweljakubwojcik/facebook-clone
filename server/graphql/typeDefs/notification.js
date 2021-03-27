const { gql } = require('apollo-server')

module.exports = gql`
    enum NotificationTypes {
        INVITATION
        POST
        GENERAL
    }

    type Notification {
        id: ID!
        body: String!
        createdAt: String!
        timestamp: Float!
        isSeen: Boolean!
        from: User
        image: Image
        type: NotificationTypes!
    }

    extend type Query {
        notifications(limit: Int!, offset: Int!): User!
    }

    extend type Mutation {
        markNotificationSeen(notificationId: ID!): User!
    }
`
