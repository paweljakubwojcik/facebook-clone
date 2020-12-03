
import React from 'react'
import styled from 'styled-components'
import ElementContainer from './ElementContainer'


export default function ErrorMessage({ modal, children }) {


    return (
        <ElementContainer>
            <StyledErrorMessage>
                {children}
            </StyledErrorMessage>
        </ElementContainer>
    )
}

const StyledErrorMessage = styled.p`
    color:#f75656;
    font-size:.8em;
`
