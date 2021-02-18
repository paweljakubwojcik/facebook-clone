const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`
    extend type Query {
        posts(userId: ID, paginationData: CursorBasedPagination): [Post]
        post(postId: ID!): Post
    }

    extend type Mutation {
        createPost(
            body: String
            title: String
            privacy: Privacy
            images: [Upload]
        ): Post!
        deletePost(postId: ID!): String!
        editPost(postId: ID!, field: String!, newValue: String!): Post!

        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!

        likePost(postId: ID!): Post!
        likeComment(postId: ID!, commentId: ID!): Post!
    }

    type Post {
        id: ID!
        body: String
        title: String
        createdAt: String!
        username: String!
        user: User!
        comments(paginationData: CursorBasedPagination): [Comment]!
        likes: [Like]!
        commentsCount: Int!
        likesCount: Int!
        privacy: Privacy
        isDeletable: Boolean
        images: [Image]
    }

    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        user: User!
        body: String!
        likes: [Like]!
        likesCount: Int!
    }

    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
`
