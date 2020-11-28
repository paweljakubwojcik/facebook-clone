import React from 'react'
import styled from 'styled-components'



export default function ElementContainer({ children, ...rest }) {
    return (
        <Container {...rest} >
            {children}
        </Container>
    )
}

export const Container = styled.div`
    width:100%;
    background-color:${props => props.theme.primaryElementColor};
    border-radius:.5em;
    ${props => props.noMargins ? "" : 'margin: 2vh 2%;'}
    ${props => props.noPadding ? "" : 'padding:1em;'}
    cursor:default;
    
    border: solid 1px ${props => props.theme.borderColor};
    box-shadow: ${props => props.theme.standardShadow};
    @media (max-width:600px){
        border-radius:0;
    }
`