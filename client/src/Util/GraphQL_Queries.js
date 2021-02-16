import { gql } from '@apollo/client'

export const BASE_COMMENT_FRAGMENT = gql`
    fragment BaseComment on Comment {
            id
            body
            username
            createdAt
            likesCount
            user{
                username
                id
            }
            likes{
                id
                username
            }
    }
  `

export const GET_POSTS = gql`
query posts($userId:ID, $limit:Int!, $cursor:ID){
    posts(userId:$userId, limit:$limit, cursor:$cursor){
        body
        title
        commentsCount
        id
        createdAt
        likesCount
        username
        privacy
        isDeletable
        user{
            id
            username
            profileImage{
                    urls{
                        id
                        small
                        medium
                    }
                }
        }
        comments {
            ...BaseComment
        }
        likes {
            id
            username
        }
        images{
            id
            urls{
                id
                small
                medium
            }
        }
    }
}

${BASE_COMMENT_FRAGMENT}
`

// graphQL query
export const ADD_POST = gql`
    mutation createPost( $body:String , $privacy:Privacy, $title:String){
        createPost( body:$body,privacy:$privacy,title:$title ){
            body
            title
            commentsCount
            id
            createdAt
            likesCount
            username
            user{
                id
                profileImage{
                        urls{
                            id
                            small
                            medium
                        }
                    }
            }
            comments {
            ...BaseComment
            }
            
            images{
                id
                urls{
                    id
                    small
                    medium
            }
            }
        }
    }
    ${BASE_COMMENT_FRAGMENT}
`

export const DELETE_POST = gql`
    mutation deletePost( $postId:ID! ){
        deletePost( postId:$postId )
        }
`

export const EDIT_POST = gql`
    mutation deletePost( $postId:ID!, $field:String!, $newValue:String! ){
        editPost( postId:$postId, field:$field, newValue:$newValue ){
            id
            privacy
            body
            username
        }
        }
`



export const GET_USERS = gql`
query user(  $limit:Int!, $offset:Int! ){
 users(limit:$limit, offset:$offset) {
    id
    username
    profileImage{
        urls{
            id
            medium
            small
            }
      
        }
    }
}
`
export const GET_USER = gql`
query user(  $userId: ID! ){
 user( userId: $userId,) {
    id
    username
    backgroundImage{
                id
                urls{
                    small
                    medium
                    large
                }
            }
    profileImage{
                id
                urls{
                   
                    small
                    medium
                    large
                }
            }
    
    info{
        joiningDate
        birthDate
        age 
        sex
        description
        location
        job
    }
    images{
        id
        title
        createdAt
        urls{
            id
            small
            medium
            large
        }
    }
    friends{
        id
        username
        profileImage{
            urls{
                 id
                medium
                small
            }
        }
    }
    invitations{
        from{
            id
            username
        }
        id
    }
    notificationCount
}
}
`

export const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username,
                password: $password,
        ){
            id
            token
            username
            email
            createdAt
            settings{
                preferredTheme
            }
            profileImage{
                urls{
                    id
                    medium
                    large
                }
            }
        }
    }
`

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username,
                email: $email,
                password: $password,
                confirmPassword:$confirmPassword,
            }
        ){
            id
            token
            username
            email
            createdAt
            profileImage{
                urls{
                    id
                    medium
                    large
                }
            }
        }
    }
`

export const LIKE_POST = gql`
    mutation likePost($postId:ID!)
    {
        likePost(postId:$postId){
            id
            likes{
                id
                createdAt
                username
            }
            body
            likesCount
            }
        }

`

export const GET_IMAGE = gql`
    query image(  $imageId: ID! ){
        image(imageId: $imageId){
        id
        title
        createdAt
        uploadedBy
        urls{
            id
            small
            medium
            large
            }
        author{
            name
            link
            }
        
        post{
            id
            images{
                id
            }
        }
    }
    }
`

export const ADD_PICTURE = gql`
    mutation uploadPicture(
        $post:ID!
        $small:String!
        $medium:String!
        $large:String!
        $title:String
    )
    {
        uploadPicture(
            ImageInput:{
                urls:{
                    small:$small
                    medium:$medium
                    large:$large
                },
                post:$post,
                title:$title
            }){
            id
           urls{
                id
               large
               medium
               small
           }
           post{
               id
           }
        }
    }

`

export const UPDATE_USER = gql`
mutation updateUser(
    $field:String!
    $newValue:String!
){
    updateUser(field: $field, newValue: $newValue){
        id
        email
        username
        backgroundImage{
            id
            post{
                id
            }
            urls{
                id
                small
                medium
                large
            }
        }
        profileImage{
            urls{
                id
                medium
                large
                }
            }
    }
}`

export const INVITE_USER = gql`
mutation inviteUser(
   $userId:ID!
){
    inviteUser(userId:$userId){
        id
        email
        username
       invitations{
            id
            date
            from{
                id
            }
       }
    }
}`

export const ANSWER_INVITATION = gql`
mutation answerInvitation(
   $from:ID!
   $answer:Answer!
){
   answerInvitation(from:$from, answer:$answer){
        id
        username
       invitations{
            id
            date
            from{
                id
            }
       }
       friends{
           id
           username
       }
    }
}`

export const MARK_SEEN = gql`

mutation markNotificationSeen( $notificationId:ID!){
    markNotificationSeen(notificationId:$notificationId){
        id
        username
        notificationCount
    }
}

`
