const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`

    type Post{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
        user:String!
        comments:[Comment]!
        likes:[Like]!
        commentsCount:Int!
        likesCount:Int!
    }
    type Comment{
        id:ID!
        createdAt:String!
        username:String!
        body:String!
    }
    type Like{
        id:ID!
        createdAt:String!
        username:String!
    }
    type ProfileImage{
        small:String
        medium:String
        large:String
    }
    type User{
        id:ID!
        email:String!
        token:String!
        username:String!
        createdAt:String!
        backgroundImage:String
        isOnline:Boolean
        lastTimeOnline:String
        profileImage:ProfileImage
    }
    input RegisterInput{
        username: String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    type Query{
        getPosts(userId:ID):[Post]
        getPost(postId:ID!): Post
        getUsers: [User]
        getUser(userId:ID!): User
    }
    type Mutation{
        register(registerInput:RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body:String!):Post!
        deletePost(postId:ID!):String!
        createComment(postId:String!,body:String!): Post!
        deleteComment(postId:ID!,commentId:ID!):Post!
        likePost(postId:ID!):Post!
    }
 `