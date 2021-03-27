import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { useQuery, useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'
import { INVITE_USER, GET_USER_FRIENDS } from '../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

import { FilledButton } from '../../Components/General/Buttons'
import AnswerToInvitation from '../../Components/General/ActionButtons/AnswerToInvitation'
import DotLoader from '../../Components/General/DotLoader'

export default function ActionButtons({ user, state, setState }) {
    const context = useContext(AuthContext)

    const { data: { user: contextUser } = {} } = useQuery(GET_USER_FRIENDS, {
        variables: { userId: context.userId },
        pollInterval: 500,
    })

    //TODO: change this so we only fetch inforamtion about friendship status
    useEffect(() => {
        if (contextUser) {
            const isFriend = !!user.friends.find((friend) => friend.id === contextUser?.id)
            const isInviting = !!contextUser?.invitations.find((inv) => inv.from.id === user.id)
            const isInvited = !!user.invitations.find((inv) => inv.from.id === contextUser?.id)

            let state = 'NOT_FRIEND'
            if (isFriend) state = 'FRIEND'
            if (isInviting) state = 'INVITING'
            if (isInvited) state = 'INVITED'
            setState(state)
        }
    }, [contextUser, user, state, setState])

    return (
        <>
            {state === 'NOT_FRIEND' && <AddFriend userId={user.id} />}
            {state === 'FRIEND' && <FriendButton />}
            {state === 'INVITED' && <RequestSent />}
            {state === 'INVITING' && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>{user.username} wants to be your fakefriend!</div>
                    <div style={{ display: 'flex' }}>
                        <AnswerToInvitation from={user.id} />
                    </div>
                </div>
            )}
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
