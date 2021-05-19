import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../Context/auth'
import Avatar from '../General/Avatar'

export default function Message({ message, last, first, ...rest }) {
    const { body, user } = message
    const { userId } = useContext(AuthContext)

    const isItMyMessage = userId === user.id

    return (
        <Container isItMyMessage={isItMyMessage}>
            {!isItMyMessage &&
                (first ? (
                    <Avatar image={user.profileImage.urls.thumbnail} size={32} />
                ) : (
                    <div style={{ display: 'block', width: 32 }}></div>
                ))}
            <Body isItMyMessage={isItMyMessage} last={last} first={first}>
                {body}
            </Body>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.isItMyMessage ? 'row-reverse' : 'row')};
    padding: 0 0.5em;

    word-wrap: break-word;
`

const smallBorderRound = '0.1em'
const borderRound = '1em'

const Body = styled.div`
    max-width: 70%;

    margin: 0.1em 0.3em;
    padding: 0.5em 0.7em;
    border-radius: ${borderRound};

    border-top-left-radius: ${(props) =>
        !props.isItMyMessage && !props.last ? smallBorderRound : borderRound};
    border-bottom-left-radius: ${(props) =>
        !props.isItMyMessage && !props.first ? smallBorderRound : borderRound};
    border-top-right-radius: ${(props) =>
        props.isItMyMessage && !props.last ? smallBorderRound : borderRound};
    border-bottom-right-radius: ${(props) =>
        props.isItMyMessage && !props.first ? smallBorderRound : borderRound};

    background-color: ${(props) =>
        props.isItMyMessage ? props.theme.primaryColor : props.theme.secondaryElementColor};
    color: ${(props) => (props.isItMyMessage ? 'white' : 'inherit')};
`
