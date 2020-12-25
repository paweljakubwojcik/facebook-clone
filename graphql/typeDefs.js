const { gql } = require('apollo-server')

//setting up GraphQL
module.exports = gql`

    type Post{
        id:ID!
        body:String
        title:String
        createdAt:String!
        username:String!
        user:User!
        comments:[Comment]!
        likes:[Like]!
        commentsCount:Int!
        likesCount:Int!
        privacy:Privacy
        isDeletable:Boolean
        images: [Image]
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
    type Settings {
        preferredTheme: String,
        postDefaultPrivacy: Privacy,
    }
    enum Privacy{
        PUBLIC
        PRIVATE
        FRIENDS_ONLY
    }
    enum Answer{
        ACCEPT
        DECLINE
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
        from:User
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
        notificationCount:Int!
        info:UserInfo!
    }
    
    input RegisterInput{
        username: String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    type Query{
        getPosts(userId:ID,limit:Int!,offset:Int!):[Post]
        getPost(postId:ID!): Post
        getUsers: [User]
        getUser(userId:ID!): User
        getImages(userId:ID!):[Image]
        getImage(imageId:ID!):Image
    }
    type Mutation{
        register(registerInput:RegisterInput): User!
        login(username: String!, password: String!): User!
        logout(userId:ID!): ID!
        createPost(body:String, title:String, privacy:Privacy):Post!
        deletePost(postId:ID!):String!
        editPost(postId:ID!,field:String!, newValue:String!):Post!
        
        createComment(postId:ID!,body:String!): Post!
        deleteComment(postId:ID!,commentId:ID!):Post!
        
        likePost(postId:ID!):Post!
        likeComment(postId:ID!,commentId:ID!):Post!
       
        updateSettings(setting:String!,newValue:String!):User!
        updateUser(field:String!, newValue:String!):User!
        
        uploadPicture(ImageInput:ImageInput!):Image!

        inviteUser(userId:ID!):User!
        answerInvitation(from:ID!,answer:Answer!):[User!]
    }
 `
