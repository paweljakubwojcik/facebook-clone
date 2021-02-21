import { gql } from '@apollo/client'


export const GET_USERS = gql`
    query user($limit: Int!, $offset: Int!) {
        users(limit: $limit, offset: $offset) {
            id
            username
            profileImage {
                urls {
                    id
                    medium
                    small
                }
            }
        }
    }
`
export const GET_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            username
            backgroundImage {
                id
                urls {
                    small
                    medium
                    large
                }
            }
            profileImage {
                id
                urls {
                    small
                    medium
                    large
                }
            }

            info {
                joiningDate
                birthDate
                age
                sex
                description
                location
                job
            }
            images {
                id
                title
                createdAt
                urls {
                    id
                    small
                    medium
                    large
                }
            }
            friends {
                id
                username
                profileImage {
                    urls {
                        id
                        medium
                        small
                    }
                }
            }
            invitations {
                from {
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
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            token
            username
            email
            createdAt
            settings {
                preferredTheme
            }
            profileImage {
                urls {
                    id
                    medium
                    large
                }
            }
        }
    }
`

export const REGISTER_USER = gql`
    mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
        register(registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
            id
            token
            username
            email
            createdAt
            profileImage {
                urls {
                    id
                    medium
                    large
                }
            }
        }
    }
`