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
        user{
            id
            username
            profileImage{
                    urls{
                        small
                        medium
                    }
                }
        }
        comments {
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
        likes {
            id
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
            user{
                id
                profileImage{
                        urls{
                            small
                            medium
                        }
                    }
            }
            comments {
            id
            body
            username
            user{
                id
                username
                profileImage{
                    urls{
                        small
                    }
                }
            }
            createdAt
            id
            likes{
                username
                id
            }
            likesCount
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
    profileImage{
        urls{
            medium
            small
            }
      
        }
    }
}
`
export const GET_USER = gql`
query getUser(  $userId: ID! ){
 getUser( userId: $userId,) {
    id
    username
    backgroundImage{
                urls{
                    medium
                    large
                }
            }
    profileImage{
                urls{
                    small
                    medium
                    large
                }
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
                urls{
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