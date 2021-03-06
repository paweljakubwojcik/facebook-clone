const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`
    extend type Query {
        images(userId: ID!, limit: Int!, offset: Int!): [Image]
        image(imageId: ID!): Image
        imageOfTheDay: Image
    }

    extend type Mutation {
        uploadPicture(ImageInput: ImageInput!): Image!
            @deprecated(reason: "no front end uploading anymore, use 'createPost' instead")

        updatePicture(id: ID!, field: String!, newValue: String!): Image!
    }

    type Urls {
        id: ID!
        thumbnail: String
        small: String
        medium: String
        large: String
    }
    input UrlsInput {
        small: String
        medium: String
        large: String
    }
    type ImageAuthor {
        name: String!
        link: String
    }
    type Image {
        id: ID!
        title: String
        filename: String
        createdAt: String
        urls: Urls!
        author: ImageAuthor!
        uploadedBy: String!
        post: Post
    }
    input ImageInput {
        urls: UrlsInput!
        post: ID!
        title: String
    }
`
