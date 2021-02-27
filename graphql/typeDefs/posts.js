const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`
    extend type Query {
        posts(userId: ID, paginationData: CursorBasedPagination): [Post]
        post(postId: ID!): Post
    }

    extend type Mutation {
        createPost(body: String, title: String, privacy: Privacy, images: [Upload]): Post!
        deletePost(postId: ID!): String!
        editPost(postId: ID!, field: String!, newValue: String!): Post!

        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!

        reactToPost(postId: ID!, type: ReactionType!): Post!
        reactToComment(postId: ID!, commentId: ID!, type: ReactionType!): Post!
    }

    type Post {
        id: ID!
        body: String
        title: String
        createdAt: String!
        timestamp: Int!
        user: User!
        comments(paginationData: CursorBasedPagination): [Comment]!
        reactions: [Reaction]!
        commentsCount: Int!
        reactionsCount: Int!
        privacy: Privacy
        isDeletable: Boolean
        images: [Image]
    }

    type Comment {
        id: ID!
        createdAt: String!
        timestamp: Int!
        user: User!
        body: String!
        reactions: [Reaction]!
        reactionsCount: Int!
    }

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
`
