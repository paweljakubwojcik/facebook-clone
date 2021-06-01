import React from 'react'
import styled from 'styled-components'
import ElementContainer from './ElementContainer'

export default function ErrorMessage({ modal, textOnly, children }) {
    const error = <StyledErrorMessage>{children}</StyledErrorMessage>

    return textOnly ? error : <ElementContainer>{error}</ElementContainer>
}

const StyledErrorMessage = styled.p`
    color: ${(props) => props.theme.errorColor};
    font-size: 0.8em;
`
