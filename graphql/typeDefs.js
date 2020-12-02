const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`

    type Post{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
        user:User!
        comments:[Comment]!
        likes:[Like]!
        commentsCount:Int!
        likesCount:Int!
        privacy:String
    }
    type Comment{
        id:ID!
        createdAt:String!
        username:String!
        user:User!
        body:String!
        likes:[Like]!
        likesCount:Int!
    }
    type Like{
        id:ID!
        createdAt:String!
        username:String!
    }
    type Urls{
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
        urls:Urls!
        author: ImageAuthor!
        uploadedBy: String!
    }
    type Settings {
        preferredTheme: String,
        postDefaultPrivacy: String,
    }
    type Invitation {
        id:ID!
        from: User!
        date: String!
    }
    type Notification {
        id:ID!
        body: String,
        createdAt: String,
        isSeen: Boolean,
    }
    type UserInfo{
        joiningDate: String
        birthDate: String
        age: Int
        sex: String
        description: String
        location: String
        job: String
    }
    type User{
        id:ID!
        email:String!
        token:String!
        username:String!
        createdAt:String!
        backgroundImage:Image
        profileImage:Image
        images:[Image]!
        isOnline:Boolean!
        lastTimeOnline:String!
        settings: Settings!
        invitations:[Invitation]!
        friends:[User]!
        notifications:[Notification]!
        info:UserInfo!
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
        getImages(userId:ID!):[Image]
        getImage(imageId:ID!):Image
    }
    type Mutation{
        register(registerInput:RegisterInput): User!
        login(username: String!, password: String!): User!
        logout(userId:ID!): String!
        createPost(body:String!):Post!
        deletePost(postId:ID!):String!
        createComment(postId:ID!,body:String!): Post!
        deleteComment(postId:ID!,commentId:ID!):Post!
        likePost(postId:ID!):Post!
        likeComment(postId:ID!,commentId:ID!):Post!
    }
 `
 //TODO: adding/deleting pictures