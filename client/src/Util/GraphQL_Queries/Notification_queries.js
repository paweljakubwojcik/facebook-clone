import { gql } from '@apollo/client'

export const MARK_SEEN = gql`
    mutation markNotificationSeen($notificationId: ID!) {
        markNotificationSeen(notificationId: $notificationId) {
            id
            username
            notificationCount
        }
    }
`

export const GET_NOTIFICATIONS = gql`
    query user($limit: Int!, $cursor: ID, $sortBy: String, $sort: SortDirection, $userId: ID!) {
        user(userId: $userId) {
            id
            notifications(
                paginationData: { limit: $limit, cursor: $cursor, sortBy: $sortBy, sort: $sort }
            ) {
                body
                id
                timestamp
                type
                isSeen
                from {
                    id
                    username
                    profileImage {
                        urls {
                            id
                            small
                        }
                    }
                }
            }
        }
    }
`
