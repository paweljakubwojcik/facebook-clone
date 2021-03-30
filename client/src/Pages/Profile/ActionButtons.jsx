import React, { useEffect, useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { INVITE_USER, GET_FRIENDSHIP_STATUS, DELETE_FRIEND } from '../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { FilledButton } from '../../Components/General/Buttons'
import AnswerToInvitation from '../../Components/General/ActionButtons/AnswerToInvitation'
import DotLoader from '../../Components/General/DotLoader'
import AreYouSureBox from '../../Components/General/AreYouSureBox'

export default function ActionButtons({ user, state, setState }) {
    const { data: { getFriendshipStatus: status } = {} } = useQuery(GET_FRIENDSHIP_STATUS, {
        variables: { withUser: user.id },
        pollInterval: 1000,
    })

    useEffect(() => {
        setState(status)
    }, [status, setState])

    console.log(status)

    return (
        <>
            {state === 'NOT_FRIEND' && <AddFriend userId={user.id} />}
            {state === 'FRIEND' && <FriendButton userId={user.id} />}
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

const FriendButton = ({userId}) => {
    const [hover, setHover] = useState(false)
    const [areSure, setAreSure] = useState(false)

    const [deleteFriend, { loading }] = useMutation(DELETE_FRIEND, {
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

    return (
        <>
            <FilledButton
                red
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setAreSure(true)}
            >
                {!loading ? (
                    <>
                        <FontAwesomeIcon icon={hover ? faTimes : faCheck} />
                        <span>{hover ? 'Delete friend' : 'Friend'}</span>
                    </>
                ) : (
                    <DotLoader style={{ fontSize: '.6em' }} />
                )}
            </FilledButton>
            {areSure && (
                <AreYouSureBox callback={deleteFriend} close={() => setAreSure(false)}>
                    Are you sure?
                </AreYouSureBox>
            )}
        </>
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
