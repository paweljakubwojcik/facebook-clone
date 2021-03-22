const { gql } = require('apollo-server')

module.exports = gql`
    enum Answer {
        ACCEPT
        DECLINE
    }
    enum NotificationTypes {
        INVITATION
        POST
        GENERAL
    }
    type Invitation {
        id: ID!
        from: User!
        date: String!
    }
    type Notification {
        id: ID!
        body: String!
        createdAt: String!
        isSeen: Boolean!
        from: User
        iconImage: Image
        type: NotificationTypes!
    }

    extend type Query {
        notifications(limit: Int!, offset: Int!): User!
    }

    extend type Mutation {
        inviteUser(userId: ID!): User!
        answerInvitation(from: ID!, answer: Answer!): [User!]
        markNotificationSeen(notificationId: ID!): User!
    }
`
