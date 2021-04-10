const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`
    extend type Query {
        posts(userId: ID, paginationData: CursorBasedPagination): [Post]
        post(postId: ID!): Post
    }

    extend type Mutation {
        createPost(body: String, title: String, privacy: Privacy, images: [Upload]): Post!
        editPost(postId: ID!, field: String!, newValue: String!): Post!

        createComment(postId: ID!, body: String!, images: [Upload]): Post!
        createReply(commentId: ID!, body: String!, image: Upload): Comment!

        reactToPost(postId: ID!, type: ReactionType!): Post!
            @deprecated(reason: "Use 'react' instead ")
        reactToComment(postId: ID!, commentId: ID!, type: ReactionType!): Post!
            @deprecated(reason: "Use 'react' instead ")
        reactToEntity(id: ID!, type: ReactionType!): Entity!
            @deprecated(reason: "Use 'react' instead ")
    }

    type Post implements Entity {
        id: ID!
        body: String
        title: String
        createdAt: String!
        timestamp: Float!
        user: User!
        comments(paginationData: CursorBasedPagination!): [Comment]!
        reactions: [Reaction]!
        commentsCount: Int!
        reactionsCount: Int!
        privacy: Privacy
        isDeletable: Boolean
        images: [Image]
    }

    type Comment implements Entity {
        id: ID!
        createdAt: String!
        timestamp: Float!
        user: User!
        body: String!
        reactions: [Reaction]!
        reactionsCount: Int!
        images: [Image]
        replies(paginationData: CursorBasedPagination!): [Reply]!
        repliesCount: Int!
    }

    type Reply implements Entity {
        id: ID!
        createdAt: String!
        timestamp: Float!
        user: User!
        body: String!
        reactions: [Reaction]!
        reactionsCount: Int!
        images: [Image]
    }
`
