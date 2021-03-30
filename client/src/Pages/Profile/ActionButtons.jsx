import React, {  useEffect } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { INVITE_USER, GET_FRIENDSHIP_STATUS } from '../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

import { FilledButton } from '../../Components/General/Buttons'
import AnswerToInvitation from '../../Components/General/ActionButtons/AnswerToInvitation'
import DotLoader from '../../Components/General/DotLoader'

export default function ActionButtons({ user, state, setState }) {

    const { data: { getFriendshipStatus: status } = {} } = useQuery(GET_FRIENDSHIP_STATUS, {
        variables: { withUser: user.id },
        pollInterval: 2000,
    })

    useEffect(() => {
        setState(status)
    }, [status, setState])

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
