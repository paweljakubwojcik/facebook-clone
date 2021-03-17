import { gql } from '@apollo/client'

export const BASE_COMMENT_FRAGMENT = gql`
    fragment BaseComment on Comment {
        id
        body
        createdAt
        timestamp
        reactionsCount
        user {
            username
            id
            profileImage {
                id
                urls {
                    id
                    thumbnail
                }
            }
        }
        reactions {
            ...BaseReaction
        }
    }
`

const REACTION = gql`
    fragment BaseReaction on Reaction {
        id
        createdAt
        timestamp
        type
        user {
            id
            username
        }
    }
`

export const POST = gql`
    fragment PostFragment on Post {
        id
        body
        title
        commentsCount
        createdAt
        timestamp
        reactionsCount
        privacy
        isDeletable
        user {
            id
            username
            profileImage {
                urls {
                    id
                    thumbnail
                    small
                    large
                }
            }
        }
        reactions {
            ...BaseReaction
        }
        images {
            id
            urls {
                id
                small
                medium
                large
            }
        }
    }
    ${REACTION}
`
// for some weird reason when attempting to fetch that query with only fragment, query is sending back an empty object
export const GET_POSTS = gql`
    query posts($userId: ID, $limit: Int!, $cursor: ID, $sort: SortDirection, $sortBy: String) {
        posts(
            userId: $userId
            paginationData: { limit: $limit, cursor: $cursor, sort: $sort, sortBy: $sortBy }
        ) {
            ...PostFragment
            id
        }
    }

    ${POST}
    ${REACTION}
`

export const GET_POST = gql`
    query post($postId: ID!) {
        post(postId: $postId) {
            ...PostFragment
            id
        }
    }
    ${POST}
    ${REACTION}
`

// graphQL query
export const ADD_POST = gql`
    mutation createPost($body: String, $privacy: Privacy, $title: String, $images: [Upload]) {
        createPost(body: $body, privacy: $privacy, title: $title, images: $images) {
            id
            ...PostFragment
        }
    }
    ${POST}
`

export const DELETE_POST = gql`
    mutation delete($postId: ID!) {
        delete(id: $postId) {
            id
        }
    }
`

export const EDIT_POST = gql`
    mutation editPost($postId: ID!, $field: String!, $newValue: String!) {
        editPost(postId: $postId, field: $field, newValue: $newValue) {
            id
            body
            timestamp
            title
            privacy
        }
    }
`

export const REACT = gql`
    mutation react($id: ID!, $type: ReactionType!) {
        react(id: $id, type: $type) {
            id
            reactions {
                ...BaseReaction
            }
            reactionsCount
        }
    }
    ${REACTION}
`

/*
ISSUE - POTENTIAL SOURCE OF BUGS in future
This must be exacly the same shape as comments on getPosts query,
otherwise apollo makes new request to server to get rest of fields 
and as a result pagination breaks 
 
SOLVED
using GraphQL Fragments,
in other words making sure that apollo doesnt need to refetch missing fields 
*/
export const ADD_COMMENT = gql`
    mutation createComment($body: String!, $postId: ID!) {
        createComment(body: $body, postId: $postId) {
            id
            commentsCount
            timestamp
            comments(paginationData: { limit: 5 }) {
                ...BaseComment
            }
        }
    }
    ${BASE_COMMENT_FRAGMENT}
    ${REACTION}
`

export const DELETE = gql`
    mutation delete($id: ID!) {
        delete(id: $id) {
            id
        }
    }
`
export const FETCH_COMMENTS = gql`
    query post($postId: ID!, $limit: Int!, $cursor: ID, $sort: SortDirection, $sortBy: String) {
        post(postId: $postId) {
            id
            comments(
                paginationData: { limit: $limit, cursor: $cursor, sort: $sort, sortBy: $sortBy }
            ) {
                id
                ...BaseComment
            }
        }
    }
    ${REACTION}
    ${BASE_COMMENT_FRAGMENT}
`
