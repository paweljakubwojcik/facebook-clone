import { gql } from '@apollo/client'

export const GET_FRIENDS = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            friends {
                id
                username
                email
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
        }
    }
`

export const GET_COUNTERS = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            notificationCount
            messagesCount
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
            email
            backgroundImage {
                id
                urls {
                    id
                    small
                    medium
                    large
                }
            }
            profileImage {
                id
                urls {
                    id
                    small
                    medium
                    large
                }
            }
            info {
                joiningDate
                birthDate
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
                email
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
    }
`

export const GET_USER_DETAILS = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            username
            backgroundImage {
                urls {
                    id
                    medium
                }
            }
            profileImage {
                id
                urls {
                    id
                    medium
                }
            }
            info {
                joiningDate
                location
                job
            }
            friends {
                id
            }
            invitations {
                id
                from {
                    id
                    username
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

export const LOGIN_USER_WITH_GOOGLE = gql`
    mutation login($code: String!) {
        loginWithGoogle(code: $code) {
            id
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
                urls {
                    id
                    small
                    medium
                    large
                }
            }
            profileImage {
                id
                urls {
                    id
                    medium
                    large
                }
            }
        }
    }
`

export const UPDATE_USER_INFO = gql`
    mutation updateUserInfo($field: String!, $newValue: String!) {
        updateUserInfo(field: $field, newValue: $newValue) {
            id
            info {
                joiningDate
                birthDate
                sex
                description
                location
                job
            }
        }
    }
`

export const SEARCH = gql`
    query searchForUser($query: String!, $limit: Int, $offset: Int) {
        searchForUser(query: $query, limit: $limit, offset: $offset) {
            username
            id
            email
            profileImage {
                id
                urls {
                    id
                    small
                }
            }
        }
    }
`

export const INVITE_USER = gql`
    mutation inviteUser($userId: ID!) {
        inviteUser(userId: $userId) {
            id
            username
            invitations {
                id
                timestamp
                from {
                    id
                }
            }
        }
    }
`

export const DELETE_FRIEND = gql`
    mutation deleteFriend($userId: ID!) {
        deleteFriend(userId: $userId) {
            id
            username
        }
    }
`

export const ANSWER_INVITATION = gql`
    mutation answerInvitation($from: ID!, $answer: Answer!) {
        answerInvitation(from: $from, answer: $answer) {
            id
        }
    }
`

export const GET_FRIENDSHIP_STATUS = gql`
    query getFriendshipStatus($withUser: ID!) {
        getFriendshipStatus(withUser: $withUser)
    }
`
