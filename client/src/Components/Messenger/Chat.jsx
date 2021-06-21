import React, { useContext, useState } from 'react'
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
import { GET_CONVERSATION } from '../../Util/GraphQL_Queries'
import { useIntersectionObserver } from '../../Util/Hooks/useIntersectionObserver'
import MessagesContainer from './MessagesContainer'
import ErrorMessage from '../General/ErrorMessage'

// USE SubscribeForMore

export default function Chat({ chatId }) {
    const { removeChat, minimaliseChat } = useContext(MessengerContext)
    const { user: currentUser = {} } = useCurrentUser()

    const {
        data: { conversation: { chatName, users, image, messages } = {} } = {},
        error,
        loading,
        fetchMore,
    } = useQuery(GET_CONVERSATION, {
        variables: {
            id: chatId,
            limit: 10,
            sort: 'DESCENDING',
            sortBy: 'timestamp',
        },
        onError: (e) => {
            console.log(e)
        },
    })

    const { setRef } = useIntersectionObserver(
        {
            threshold: 0.7,
        },
        handleIntersect
    )

    const [canFetchMore, setCanFetchMore] = useState(true)

    async function handleIntersect() {
        fetchMore({
            variables: {
                cursor:
                    messages?.length > 0 && messages ? messages[messages?.length - 1]?.id : null,
            },
        }).then(
            ({
                data: {
                    conversation: { messages: newMessages },
                },
            }) => {
                //when all posts have been fetched
                if (newMessages.length < 10) setCanFetchMore(false)
            }
        )
    }

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
            <MessagesPlace>
                {messages?.length ? (
                    <MessagesContainer messages={messages}>
                        {canFetchMore && (
                            <div ref={setRef} style={{ height: '30px', display: 'block' }}></div>
                        )}
                    </MessagesContainer>
                ) : error ? (
                    <ErrorMessage textOnly>{error.name}</ErrorMessage>
                ) : (
                    <NoMessages image={image} />
                )}
            </MessagesPlace>
            <MessageForm chatId={chatId} />
        </Container>
    )
}

const NoMessages = ({ image }) => {
    return (
        <>
            <Avatar image={image?.urls?.small} size={64} />
            <p>There are no messages</p>
            <p>Start conversation right now !</p>
        </>
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

const MessagesPlace = styled.div`
    display: flex;
    height: 100%;
    width: 100%;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
`

const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
`
