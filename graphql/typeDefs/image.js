const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`

    extend type Query {
        images(userId:ID!, limit:Int!, offset:Int!):[Image]
        image(imageId:ID!):Image
    }

    extend type Mutation {
         uploadPicture(ImageInput:ImageInput!):Image!
    }

    type Urls{
        id:ID!
        small:String
        medium:String
        large:String
    }
    input UrlsInput{
        small:String
        medium:String
        large:String
    }
    type ImageAuthor{
        name: String!
        link: String
    }
    type Image{
        id:ID!
        title:String
        createdAt:String
        urls:Urls!
        author: ImageAuthor!
        uploadedBy: String!
        post:Post
    }
    input ImageInput{
        urls:UrlsInput!
        post:ID!
        title:String
    }
`