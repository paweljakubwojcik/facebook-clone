import React from 'react'

import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function PopUpList({ list }) {

    return (
        <Container>
            {list.map(element => <Name key={element.username}>{element.username}</Name>)}
        </Container>
    )
}

const Container = styled.div`
    position:relative;
    left:.5em;
    padding:.5em;
    border-radius:.5em;
    color:black;
    background-color:#ebe9e9dd;
    pointer-events:none;

`

const Name = styled.div`
    margin: .5em;
    display:block ruby;

`

PopUpList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        __typename: PropTypes.string,
        username: PropTypes.string
    }))
}