import { gql } from '@apollo/client'

import { REACTION } from '../Graphql_Fragments'

export const GET_ENTITY = gql`
    query entity($id: ID!) {
        entity(id: $id) {
            id
            body
            createdAt
            timestamp
            reactionsCount
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
            ... on Post {
                title
                commentsCount
                privacy
                isDeletable
            }
        }
    }
    ${REACTION}
`
