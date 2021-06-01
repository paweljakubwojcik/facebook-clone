const { gql } = require('apollo-server')

module.exports = gql`
    extend type Query {
        users(limit: Int!): [User]
        user(userId: ID!): User

        searchForUser(query: String!, limit: Int, offset: Int): [User]
        getFriendshipStatus(withUser: ID!): FriendshipStatus
    }

    extend type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        loginWithGoogle(code: String!): User!

        updateSettings(setting: String!, newValue: String!): User!
        updateUser(field: String!, newValue: String!): User!
        updateUserInfo(field: String!, newValue: String!): User!

        inviteUser(userId: ID!): User!
        answerInvitation(from: ID!, answer: Answer!): [User!]
        deleteFriend(userId: ID!): User
    }

    enum FriendshipStatus {
        INVITING
        INVITED
        FRIEND
        NOT_FRIEND
    }

    enum Answer {
        ACCEPT
        DECLINE
    }
    type Invitation {
        id: ID!
        from: User!
        timestamp: Float!
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
        settings: Settings!
        invitations: [Invitation]!
        friends: [User]!
        notifications(paginationData: CursorBasedPagination): [Notification]!
        notificationCount: Int!
        info: UserInfo!
        conversations(paginationData: CursorBasedPagination): [Conversation]!
        messagesCount: Int!
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
