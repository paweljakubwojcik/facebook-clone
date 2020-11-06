import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
width:100%;
height:200px;
background-color:${props => props.theme.primaryElementColor};
border-radius:.5em;
margin: 2vh 2%;
`

export default function Status() {
    return (
        <Container>

        </Container>
    )
}
