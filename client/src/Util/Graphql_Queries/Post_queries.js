import { gql } from '@apollo/client'

export const BASE_COMMENT_FRAGMENT = gql`
    fragment BaseComment on Comment {
        id
        body
        createdAt
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
            id
            user {
                id
                username
            }
        }
    }
`

export const GET_POSTS = gql`
    query posts($userId: ID, $limit: Int!, $cursor: ID) {
        posts(userId: $userId, paginationData: { limit: $limit, cursor: $cursor }) {
            id
            body
            title
            commentsCount
            createdAt
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
            comments(paginationData: { limit: 5 }) {
                ...BaseComment
            }
            reactions {
                id
                timestamp
                user {
                    id
                    username
                }
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
    }

    ${BASE_COMMENT_FRAGMENT}
`

// graphQL query
export const ADD_POST = gql`
    mutation createPost($body: String, $privacy: Privacy, $title: String, $images: [Upload]) {
        createPost(body: $body, privacy: $privacy, title: $title, images: $images) {
            body
            title
            commentsCount
            id
            createdAt
            reactionsCount
            user {
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
            comments {
                ...BaseComment
            }
            images {
                id
                urls {
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
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

export const EDIT_POST = gql`
    mutation editPost($postId: ID!, $field: String!, $newValue: String!) {
        editPost(postId: $postId, field: $field, newValue: $newValue) {
            id
            privacy
            body
            user {
                username
            }
        }
    }
`

export const LIKE_POST = gql`
    mutation reactToPost($postId: ID!, $type: String!) {
        reactToPost(postId: $postId, type: $type) {
            id
            reactions {
                id
                createdAt
                timestamp
                user {
                    id
                    username
                }
            }
            body
            reactionsCount
        }
    }
`
export const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            commentsCount
            comments {
                id
                body
                user {
                    id
                    username
                }
            }
        }
    }
`

export const LIKE_COMMENT = gql`
    mutation reactToComment($postId: ID!, $commentId: ID!, $type: String!) {
        reactToComment(postId: $postId, commentId: $commentId, type: $type) {
            id
            comments {
                ...BaseComment
                reactions {
                    id
                }
                reactionCount
            }
        }
    }
    ${BASE_COMMENT_FRAGMENT}
`
