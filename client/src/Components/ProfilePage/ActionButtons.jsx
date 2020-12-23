import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql, useQuery } from '@apollo/client'
import { INVITE_USER, ACCEPT_INVITATION, DECLINE_INVITATION } from '../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faEnvelope, faCheck, faTimes, faEye } from '@fortawesome/free-solid-svg-icons'
import { FilledButton } from '../General/Buttons'
import DotLoader from '../General/DotLoader'

const GET_USER_FRIENDS = gql`

   query getUser($userId:ID!){
       getUser(userId:$userId){
           invitations{
               from{
                   id
                   username
               }
               id
           },
           friends{
               id
           }
       }
   }

`

export default function ActionButtons({ user, context, seeProfile }) {

    const { data: { getUser: contextUser } = {} } = useQuery(GET_USER_FRIENDS, {
        variables: { userId: context.user.id }
    })

    const [{ isInvited, isInviting, isFriend }, setBools] = useState({ isInvited: false, isInviting: false, isFriend: false })

    const [inviteFriend, inviteData] = useMutation(INVITE_USER, {
        variables: {
            userId: user.id
        },
        update: (cache, data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [acceptFriend, acceptData] = useMutation(ACCEPT_INVITATION, {
        variables: {
            from: user.id
        },
        update: (cache, data) => {
            setBools(bools => { return { ...bools, isInviting: false } })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [declineFriend, declineData] = useMutation(DECLINE_INVITATION, {
        variables: {
            from: user.id
        },
        update: (cache, data) => {
            console.log(data)
            setBools(bools => { return { ...bools, isInviting: false } })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const hanldeInvite = (e) => {
        e.target.blur()
        console.log('invite')
        inviteFriend()
    }


    useEffect(() => {
        const isInvited = !!user.invitations.find(inv => inv.from.id === context.user.id)
        const isInviting = !!contextUser?.invitations.find(inv => inv.from.id === user.id)
        const isFriend = !!user.friends.find(friend => friend.id === context.user.id)
        setBools({ isInvited, isInviting, isFriend })
        return () => {

        }
    }, [contextUser, user.invitations, contextUser?.invitations, user.id, user.friends, context.user.id])


    // TODO: rewrite this component so it make sense
    return (
        <>
            {isInvited &&
                <FilledButton style={{ pointerEvents: 'none' }} active>
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Request sent</span>
                </FilledButton>}
            {isInviting && !isFriend &&
                <>
                    <FilledButton onClick={acceptFriend}>
                        {acceptData.loading ?
                            <DotLoader style={{ fontSize: '.6em' }} />
                            :
                            <>
                                <FontAwesomeIcon icon={faCheck} />
                                <span>Accept</span>
                            </>
                        }
                    </FilledButton>
                    <FilledButton red onClick={declineFriend}>
                        {declineData.loading ?
                            <DotLoader style={{ fontSize: '.6em' }} />
                            :
                            <>
                                <FontAwesomeIcon icon={faTimes} />
                                <span>Decline invitation</span>
                            </>
                        }
                    </FilledButton>

                </>
            }
            {isFriend &&
                <FilledButton style={{ pointerEvents: 'none' }} active>
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Friend</span>
                </FilledButton>}
            {
                !isInvited && !isFriend && !isInviting &&
                <FilledButton onClick={hanldeInvite}>
                    {
                        !inviteData.loading ?
                            <>
                                <FontAwesomeIcon icon={faUserPlus} />
                                <span>Add friend</span>
                            </>
                            :
                            <DotLoader style={{ fontSize: '.6em' }} />
                    }
                </FilledButton>
            }
            {!isInviting &&
                (seeProfile ?
                    <FilledButton as={Link} to={`/profile/${user.id}`}>
                        <FontAwesomeIcon icon={faEye} />
                        <span>See Profile</span>
                    </FilledButton>
                    :
                    <FilledButton>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>Send message</span>
                    </FilledButton>)
            }
        </>
    )
}


