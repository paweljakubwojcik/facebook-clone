const { gql } = require('apollo-server')

module.exports = gql`
    extend type Query {
        users(limit: Int!, offset: Int!): [User]
        user(userId: ID!): User
    }

    extend type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        logout(userId: ID!): ID!

        updateSettings(setting: String!, newValue: String!): User!
        updateUser(field: String!, newValue: String!): User!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
        backgroundImage: Image
        profileImage: Image
        images: [Image]!
        isOnline: Boolean!
        lastTimeOnline: String!
        settings: Settings!
        invitations: [Invitation]!
        friends: [User]!
        notifications: [Notification]!
        notificationCount: Int!
        info: UserInfo!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type UserInfo {
        joiningDate: String
        birthDate: String
        age: Int
        sex: String
        description: String
        location: String
        job: String
    }

    type Settings {
        preferredTheme: String
        postDefaultPrivacy: Privacy
    }

    enum Privacy {
        PUBLIC
        PRIVATE
        FRIENDS_ONLY
    }
`
