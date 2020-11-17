import { gql } from '@apollo/client'

export const GET_POSTS = gql`
query getPosts($userId:ID){
    getPosts(userId:$userId){
        body
        commentsCount
        id
        createdAt
        likesCount
        username
        user
        comments {
            body
            username
            user
            createdAt
            id
        }
        likes {
            username
        }
    }
}
`

// graphQL query
export const ADD_POST = gql`
    mutation createPost( $body:String! ){
        createPost( body:$body ){
            body
            commentsCount
            id
            createdAt
            likesCount
            username
            comments {
                body
                username
                createdAt
                id
                }
            likes {
                username
                }
        }
    }
`

export const DELETE_POST = gql`
    mutation deletePost( $postId:ID! ){
        deletePost( postId:$postId )
        }
`

export const GET_USERS = gql`
{
 getUsers {
    id
    username
    backgroundImage
    profileImage{
        medium
    }
    }
}
`
export const GET_USER = gql`
query getUser(  $userId: ID! ){
 getUser( userId: $userId,) {
    id
    username
    backgroundImage
    profileImage{
        medium
        large
    }
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
            profileImage{
            medium
            large
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
            medium
            large
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