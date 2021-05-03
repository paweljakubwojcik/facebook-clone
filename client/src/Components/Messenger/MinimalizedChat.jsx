import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import { MessengerContext } from '../../Context/messenger'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_MINIFIED_CONVERSATION, SUBSCRIBE_TO_CONVERSATION } from '../../Util/GraphQL_Queries'
import Avatar from '../General/Avatar'
import { ShowableButton } from '../General/Buttons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function MinimalizedChat({ chatId, ...rest }) {
    const { maximalizeChat, removeChat } = useContext(MessengerContext)

    const { data: { conversation: { image } = {} } = {}, error, loading } = useQuery(
        GET_MINIFIED_CONVERSATION,
        {
            variables: {
                id: chatId,
            },
            onError: (e) => {
                console.log(e)
            },
        }
    )

    useSubscription(SUBSCRIBE_TO_CONVERSATION, {
        variables: { conversationId: chatId },
        onSubscriptionData: ({ subscriptionData }) => {
            console.log(subscriptionData.data.newMessage)
        },
    })

    return (
        <Container>
            <CloseButton parent={Container} onClick={() => removeChat(chatId)}>
                <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
            <Avatar image={image?.urls?.small} size={50} onClick={() => maximalizeChat(chatId)} />
        </Container>
    )
}

const showAnimation = keyframes`
    from{
        transform: scale(0);
    }
    to{
        transform: scale(1);
    }
`

const Container = styled.div`
    margin: 0.5em auto;
    cursor: pointer;
    position: relative;
    pointer-events: all;
    animation: ${showAnimation} 0.2s;
`

const CloseButton = styled(ShowableButton)`
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    font-size: 10px;
    width: 2em;
    height: 2em;
`
