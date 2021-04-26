import React, { useContext } from 'react'
import styled from 'styled-components'
import { RoundButton } from '../General/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { MessengerContext } from '../../Context/messenger'
import Chat from './Chat'

export default function Messenger() {
    const { activeConversations } = useContext(MessengerContext)
    return (
        <ModalUnclickableContainer>
            <ChatsRow>
                {activeConversations.map((chatId) => (
                    <Chat chatId={chatId} key={chatId} />
                ))}
            </ChatsRow>
            <Column>
                <RoundButton style={{ fontSize: '1.25em' }} size={50}>
                    <FontAwesomeIcon icon={faPlus} />
                </RoundButton>
            </Column>
        </ModalUnclickableContainer>
    )
}

const ModalUnclickableContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    pointer-events: none;
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 0fr;
`

const Column = styled.div`
    display: flex;
    flex-direction: column-reverse;
    padding: 1.4em;
    height: 100vh;
    /* background-color: #00000055; */
    & > * {
        pointer-events: all;
    }
`

const ChatsRow = styled.div`
    display: flex;
    flex-direction: row-reverse;
    bottom: 0;
    align-self: end;
    width: 100%;
    /* background-color: #00000055; */
    & > * {
        pointer-events: all;
    }
`
