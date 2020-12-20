
import React from 'react'
import styled from 'styled-components'
import ElementContainer from './ElementContainer'


export default function ErrorMessage({ modal, textOnly, children }) {


    const error = (
        <StyledErrorMessage>
            {children}
        </StyledErrorMessage>
    )

    return (

        textOnly
            ?
            error
            :
            <ElementContainer>
                {error}
            </ElementContainer>
    )
}

const StyledErrorMessage = styled.p`
    color:#f75656;
    font-size:.8em;
`
