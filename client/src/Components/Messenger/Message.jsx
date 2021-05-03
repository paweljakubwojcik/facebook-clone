import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../Context/auth'

export default function Message({ message, last, first, ...rest }) {
    const { body, user } = message
    const { userId } = useContext(AuthContext)

    const isItMyMessage = userId === user.id

    return (
        <Container isItMyMessage={isItMyMessage}>
            <Body isItMyMessage={isItMyMessage ? 1 : 0} last={last} first={first}>
                {body}
            </Body>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${(props) => (props.isItMyMessage ? 'row-reverse' : 'row')};
    padding: 0 0.5em;
`

const smallBorderRound = '0.1em'
const borderRound = '1em'

const Body = styled.div`
    max-width: 70%;
   

    margin: 0.1em;
    padding: 0.5em;
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
`
