import { gql } from '@apollo/client'

const MESSAGE_FRAGMENT = gql`
    fragment Message on Message {
        body
        timestamp
        seenBy {
            id
        }
        user {
            id
            username
            profileImage {
                id
                urls {
                    id
                    thumbnail
                }
            }
        }
    }
`

export const GET_CONVERSATION_ID = gql`
    query conversationIdByUser($userId: ID!) {
        conversationIdByUser(userId: $userId)
    }
`

export const GET_CONVERSATION = gql`
    query conversation($id: ID!, $limit: Int!, $cursor: ID, $sort: SortDirection, $sortBy: String) {
        conversation(id: $id) {
            id
            name
            users {
                id
                username
                profileImage {
                    id
                    urls {
                        id
                        thumbnail
                    }
                }
            }
            image {
                id
                urls {
                    id
                    small
                }
            }
            messages(
                paginationData: { limit: $limit, cursor: $cursor, sort: $sort, sortBy: $sortBy }
            ) {
                id
                ...Message
            }
        }
    }
    ${MESSAGE_FRAGMENT}
`

export const GET_MINIFIED_CONVERSATION = gql`
    query conversation($id: ID!) {
        conversation(id: $id) {
            id
            image {
                id
                urls {
                    id
                    thumbnail
                    small
                }
            }
        }
    }
`

export const CREATE_CONVERSATION = gql`
    mutation createConversation($users: [ID!]) {
        createConversation(users: $users) {
            id
        }
    }
`

export const DELETE_CONVERSATION = gql`
    mutation deleteConversation($id: ID!) {
        deleteConversation(id: $id) {
            id
        }
    }
`

export const SEND_MESSAGE = gql`
    mutation sendMessage($conversationId: ID!, $body: String!) {
        sendMessage(conversationId: $conversationId, body: $body) {
            id
            messages(paginationData: { limit: 1 }) {
                id
                ...Message
            }
        }
    }
    ${MESSAGE_FRAGMENT}
`

export const SUBSCRIBE_TO_NEW_MESSAGES = gql`
    subscription newMessage($user: ID!) {
        newMessage(user: $user) {
            id
            messages(paginationData: { limit: 1 }) {
                id
                ...Message
            }
        }
    }
    ${MESSAGE_FRAGMENT}
`

export const GET_CONVERSATIONS = gql`
    query user($userId: ID!, $limit: Int!, $cursor: ID, $sort: SortDirection, $sortBy: String) {
        user(userId: $userId) {
            id
            conversations(
                paginationData: { limit: $limit, cursor: $cursor, sort: $sort, sortBy: $sortBy }
            ) {
                id
                name
                newestMessageTimestamp
                image {
                    id
                    urls {
                        id
                        small
                    }
                }
                messages(paginationData: { limit: 1 }) {
                    id
                    ...Message
                }
            }
        }
    }
    ${MESSAGE_FRAGMENT}
`

export const MARK_LAST_MESSAGES_SEEN = gql`
    mutation markLastMessagesSeen($conversationId: ID!) {
        markLastMessagesSeen(conversationId: $conversationId) {
            id
            messages(paginationData: { limit: 1 }) {
                id
                ...Message
            }
        }
    }
    ${MESSAGE_FRAGMENT}
`
