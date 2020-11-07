import React from 'react'
import styled from 'styled-components'

export default function TwoColumnLayout(props) {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    width:100%;
    height:100vh;

    display:grid;
    grid-template-columns: 1fr 1fr;

    @media(max-width: 700px) {
        grid-template-columns: 1fr;
        grid-template-rows:1fr 10fr;
        grid-auto-flow:column;
  }
`