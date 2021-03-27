import { gql } from '@apollo/client'

export const INVITE_USER = gql`
    mutation inviteUser($userId: ID!) {
        inviteUser(userId: $userId) {
            id
            email
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

export const ANSWER_INVITATION = gql`
    mutation answerInvitation($from: ID!, $answer: Answer!) {
        answerInvitation(from: $from, answer: $answer) {
            id
            username
            invitations {
                id
                timestamp
                from {
                    id
                }
            }
            friends {
                id
                username
            }
        }
    }
`

export const MARK_SEEN = gql`
    mutation markNotificationSeen($notificationId: ID!) {
        markNotificationSeen(notificationId: $notificationId) {
            id
            username
            notificationCount
        }
    }
`

export const GET_USER_NOTIFICATIONS = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            notifications {
                id
            }
        }
    }
`
