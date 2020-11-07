import React from 'react'
import styled from 'styled-components'

export default function Button({ children, type, primary }) {
    return (
        <StyledButton type={type} primary={primary}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    background-color: ${props => props.primary ? props.theme.primaryColor : props.theme.primaryFontColor};
    color: ${props => props.primary ? props.theme.primaryFontColor : props.theme.primaryColor};
    font-family:inherit;
    font-weight:bold;
    padding:1em 2em;
    border-radius:1.5em;
    margin:1.3em;
    transition:transform .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover, &:active{
        cursor:pointer;
        transform:scale(1.1);
    }
`
