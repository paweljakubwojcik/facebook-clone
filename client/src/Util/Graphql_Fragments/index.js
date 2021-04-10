import { gql } from '@apollo/client'

export const REACTION = gql`
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

export const COMMENT = gql`
    fragment Comment on Comment {
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
        images {
            id
            urls {
                id
                small
                medium
            }
        }
    }
`
