import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function PopUpList({ list }) {
    return (
        <Container>
            {list.map((element) => (
                <Name key={element.id}>{element.user.username}</Name>
            ))}
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    left: 0.5em;
    padding: 0.5em;
    border-radius: 0.5em;
    color: black;
    background-color: #ebe9e9dd;
    pointer-events: none;
`

const Name = styled.div`
    margin: 0.5em;
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
