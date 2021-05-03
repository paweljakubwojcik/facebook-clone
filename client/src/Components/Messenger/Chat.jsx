import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { GenericButton } from '../General/Buttons'
import ElementContainer from '../General/ElementContainer'
import FlexContainer from '../General/CommonStyles/FlexContainer'
import Avatar from '../General/Avatar'
import MessageForm from './MessageForm'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'

import { MessengerContext } from '../../Context/messenger'
import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'

import { useQuery } from '@apollo/client'
import {
    GET_CONVERSATION,
    SUBSCRIBE_TO_CONVERSATION,
} from '../../Util/GraphQL_Queries/Conversation_queries'
import Message from './Message'

// USE SubscribeForMore

export default function Chat({ chatId }) {
    const { removeChat, minimaliseChat } = useContext(MessengerContext)
    const { user: currentUser = {} } = useCurrentUser()

    const {
        data: { conversation: { chatName, users, image, messages } = {} } = {},
        error,
        loading,
        subscribeToMore,
    } = useQuery(GET_CONVERSATION, {
        variables: {
            id: chatId,
        },
        onError: (e) => {
            console.log(e)
        },
    })

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIBE_TO_CONVERSATION,
            variables: { conversationId: chatId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) return prev
                const newMessage = subscriptionData.data.newMessage
                return Object.assign({}, prev, {
                    conversation: { messages: [newMessage, ...prev.conversation.messages] },
                })
            },
        })
    }, [chatId, subscribeToMore])

    if (loading) return null

    return (
        <Container>
            <Header>
                <Avatar image={image?.urls?.small} size={35} />
                {!loading && !error && (
                    <>
                        {chatName
                            ? chatName
                            : users
                                  .filter((user) => user.id !== currentUser.id)
                                  .map((user) => (
                                      <Username key={user.id}>{user.username}</Username>
                                  ))}
                    </>
                )}
                <FlexContainer style={{ fontSize: '1.3em', marginLeft: 'auto' }}>
                    <BlueButton onClick={() => minimaliseChat(chatId)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </BlueButton>
                    <BlueButton onClick={() => removeChat(chatId)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </BlueButton>
                </FlexContainer>
            </Header>
            <Messages>
                {messages &&
                    messages.map((message, i) => {
                        const first = i === 0 || message.user.id !== messages[i - 1].user.id
                        const last =
                            i + 1 === messages.length || message.user.id !== messages[i + 1].user.id
                        return (
                            <Message key={message.id} message={message} first={first} last={last} />
                        )
                    })}
            </Messages>
            <MessageForm chatId={chatId} />
        </Container>
    )
}

const Container = styled(ElementContainer)`
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 450px;
    margin: 0 5px;
    padding: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0.6rem;
    width: 100%;
    height: 50px;
    color: ${(props) => props.theme.primaryColor};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
`

const Username = styled.div`
    margin: 0.4em;
    color: ${(props) => props.theme.primaryFontColor};
`

const Messages = styled.div`
    display: flex;
    flex-direction: column-reverse;
    padding: 0.5em 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
`

const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
`
