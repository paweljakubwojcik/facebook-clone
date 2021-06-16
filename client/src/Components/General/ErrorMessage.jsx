import React from 'react'
import styled from 'styled-components'
import ElementContainer from './ElementContainer'

export default function ErrorMessage({ textOnly, children, ...props }) {
    const error = <StyledErrorMessage>{children}</StyledErrorMessage>

    return textOnly ? error : <ElementContainer {...props}>{error}</ElementContainer>
}

const StyledErrorMessage = styled.p`
    color: ${(props) => props.theme.errorColor};
    font-size: 0.8em;
`
