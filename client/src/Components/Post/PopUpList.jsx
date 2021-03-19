import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function PopUpList({ list, title }) {
    return (
        <Container>
            {title && <Title>{title}</Title>}
            {list.map((element) => (
                <Name key={element.id}>{element.user.username}</Name>
            ))}
        </Container>
    )
}

const Title = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 1em;
`

const Container = styled.div`
    font-size: 0.7rem;
    font-weight: lighter;
    position: relative;
    left: 0.5em;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    color: black;
    background-color: #ebe9e9dd;
    pointer-events: none;
`

const Name = styled.div`
    margin: 0.2em 0;
    display: block ruby;
`

PopUpList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            __typename: PropTypes.string,
            username: PropTypes.string,
        })
    ),
}
