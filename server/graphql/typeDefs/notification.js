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
        type: NotificationTypes
    }

    extend type Mutation {
        markNotificationSeen(notificationId: ID!): User!
        deleteNotification(notificationId: ID!): User!
    }
`
