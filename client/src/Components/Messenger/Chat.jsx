import React from 'react'
import styled from 'styled-components'
import { GenericButton } from '../General/Buttons'
import ElementContainer from '../General/ElementContainer'
import StyledInput from '../General/StyledInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function Chat({ chatId }) {
    return (
        <Container>
            <Form style={{ flexGrow: 0 }} onSubmit={(e) => e.preventDefault()}>
                <StyledInput />
                <GenericButton>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </GenericButton>
            </Form>
        </Container>
    )
}

const Container = styled(ElementContainer)`
    display: flex;
    flex-direction: column-reverse;
    width: 320px;
    height: 450px;
    margin: 0 5px;
    padding: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`
const Form = styled.form`
    display: flex;
    padding: 1em;
    align-items: center;
`
