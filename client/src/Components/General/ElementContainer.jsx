import React from 'react'
import styled from 'styled-components'



export default function ElementContainer(props) {
    return (
        <Container {...props.rest}>
            {props.children}
        </Container>
    )
}

export const Container = styled.div`
    width:100%;
    background-color:${props => props.theme.primaryElementColor};
    border-radius:.5em;
    margin: 2vh 2%;
    padding:1em;
    @media (max-width:600px){
        border-radius:0;
    }
`