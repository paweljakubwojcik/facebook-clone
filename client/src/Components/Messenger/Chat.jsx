import React, { useContext } from 'react'
import styled from 'styled-components'
import { GenericButton } from '../General/Buttons'
import ElementContainer from '../General/ElementContainer'
import StyledInput from '../General/StyledInput'
import FlexContainer from '../General/CommonStyles/FlexContainer'
import Avatar from '../General/Avatar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'
import { MessengerContext } from '../../Context/messenger'
import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'
import { useQuery } from '@apollo/client'
import { GET_CONVERSATION } from '../../Util/GraphQL_Queries/Conversation_queries'

// USE SubscribeForMore

export default function Chat({ chatId }) {
    const { removeChat, minimaliseChat } = useContext(MessengerContext)
    const { user: currentUser = {} } = useCurrentUser()

    const {
        data: { conversation: { chatName, users, image } = {} } = {},
        error,
        loading,
    } = useQuery(GET_CONVERSATION, {
        variables: {
            id: chatId,
        },
        onError: (e) => {
            console.log(e)
        },
    })

    console.log(image)

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
                                  .map((user) => user.username)}
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
            <Messages>{'tu będą wiadomości'}</Messages>
            <Form style={{ flexGrow: 0 }} onSubmit={(e) => e.preventDefault()}>
                <StyledInput placeholder={'Aa'} />
                <BlueButton>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </BlueButton>
            </Form>
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

const Messages = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
`

const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
`

const Form = styled.form`
    display: flex;
    padding: 1em;
    align-items: center;
`
