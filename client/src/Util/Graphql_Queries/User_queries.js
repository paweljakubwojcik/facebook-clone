import { gql } from '@apollo/client'

export const GET_USERS = gql`
    query user($limit: Int!, $offset: Int!) {
        users(limit: $limit, offset: $offset) {
            id
            username
            profileImage {
                id
                urls {
                    id
                    medium
                    small
                }
            }
        }
    }
`

export const GET_CURRENT_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            username
            email
            profileImage {
                id
                urls {
                    id
                    thumbnail
                    small
                }
            }
            settings {
                preferredTheme
                postDefaultPrivacy
            }
            notificationCount
        }
    }
`

export const UPDATE_SETTINGS = gql`
    mutation updateSettings($setting: String!, $newValue: String!) {
        updateSettings(setting: $setting, newValue: $newValue) {
            id
            settings {
                preferredTheme
                postDefaultPrivacy
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

const CONTEXT = gql`
    fragment CONTEXT on User {
        id
        username
        token
        settings {
            preferredTheme
        }
        profileImage {
            id
            urls {
                id
                thumbnail
                small
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

export const SEARCH = gql`
    query searchForUser($query: String!, $limit: Int, $offset: Int) {
        searchForUser(query: $query, limit: $limit, offset: $offset) {
            username
            id
            profileImage {
                urls {
                    small
                }
            }
        }
    }
`
