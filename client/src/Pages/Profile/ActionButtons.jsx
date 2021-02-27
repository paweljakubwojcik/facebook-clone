import React, { useContext } from 'react'

import { gql, useQuery, useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'
import { INVITE_USER } from '../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

import { FilledButton } from '../../Components/General/Buttons'
import AnswerToInvitation from '../../Components/General/ActionButtons/AnswerToInvitation'
import DotLoader from '../../Components/General/DotLoader'

const GET_USER_FRIENDS = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            invitations {
                from {
                    id
                    username
                }
                id
            }
            friends {
                id
            }
        }
    }
`

export default function ActionButtons({ user }) {
    const context = useContext(AuthContext)

    const { data: { getUser: contextUser } = {} } = useQuery(GET_USER_FRIENDS, {
        variables: { userId: context.user.id },
    })

    const isFriend = !!user.friends.find((friend) => friend.id === contextUser?.id)
    const isInviting = !!contextUser?.invitations.find((inv) => inv.from.id === user.id)
    const isInvited = !!user.invitations.find((inv) => inv.from.id === contextUser?.id)

    let state = 'NOT_FRIEND'
    if (isFriend) state = 'FRIEND'
    if (isInviting) state = 'INVITING'
    if (isInvited) state = 'INVITED'

    return (
        <>
            {state === 'NOT_FRIEND' && <AddFriend userId={user.id} />}
            {state === 'FRIEND' && <FriendButton />}
            {state === 'INVITED' && <RequestSent />}
            {state === 'INVITING' && <AnswerToInvitation from={user.id} />}
        </>
    )
}

function AddFriend({ userId }) {
    const [inviteFriend, { loading }] = useMutation(INVITE_USER, {
        variables: {
            userId,
        },
        update: (cache, data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const handleInvite = (e) => {
        e.target.blur()
        console.log('invite')
        inviteFriend()
    }

    return (
        <FilledButton onClick={handleInvite}>
            {!loading ? (
                <>
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Add friend</span>
                </>
            ) : (
                <DotLoader style={{ fontSize: '.6em' }} />
            )}
        </FilledButton>
    )
}

const FriendButton = () => {
    return (
        <FilledButton style={{ pointerEvents: 'none' }} as="div">
            <FontAwesomeIcon icon={faCheck} />
            <span>Friend</span>
        </FilledButton>
    )
}

const RequestSent = () => {
    return (
        <FilledButton style={{ pointerEvents: 'none' }} active as="div">
            <FontAwesomeIcon icon={faCheck} />
            <span>Request sent</span>
        </FilledButton>
    )
}