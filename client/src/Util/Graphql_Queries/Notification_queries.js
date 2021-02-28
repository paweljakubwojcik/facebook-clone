import { gql } from '@apollo/client'

export const INVITE_USER = gql`
    mutation inviteUser($userId: ID!) {
        inviteUser(userId: $userId) {
            id
            email
            username
            invitations {
                id
                date
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
                date
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
