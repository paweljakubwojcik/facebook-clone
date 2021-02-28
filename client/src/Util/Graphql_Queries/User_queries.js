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
        }
    }
`

export const GET_USER_PIC = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            username
            profileImage {
                urls {
                    id
                    small
                    medium
                }
            }
        }
    }
`

const CONTEXT = gql`
    fragment CONTEXT on User {
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
`

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ...CONTEXT
        }
    }

    ${CONTEXT}
`

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            ...CONTEXT
        }
    }
    ${CONTEXT}
`
export const UPDATE_USER = gql`
    mutation updateUser($field: String!, $newValue: String!) {
        updateUser(field: $field, newValue: $newValue) {
            id
            email
            username
            backgroundImage {
                id
                post {
                    id
                }
                urls {
                    id
                    small
                    medium
                    large
                }
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
