import { gql } from '@apollo/client'

const MESSAGE_FRAGMENT = gql`
    fragment Message on Message {
        body
        timestamp
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

export const SUBSCRIBE_TO_CONVERSATION = gql`
    subscription newMessage($conversationId: ID!) {
        newMessage(conversationId: $conversationId) {
            id
            ...Message
        }
    }
    ${MESSAGE_FRAGMENT}
`
