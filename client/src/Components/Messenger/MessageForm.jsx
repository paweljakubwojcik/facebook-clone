import React from 'react'
import styled from 'styled-components'

import { GenericButton } from '../General/Buttons'

import StyledInput from '../General/StyledInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../../Util/Hooks/useForm'
import useResizableInput from '../../Util/Hooks/useResizableInput'
import { useMutation } from '@apollo/client'
import { SEND_MESSAGE } from '../../Util/GraphQL_Queries'

export default function MessageForm({ chatId }) {
    const initialState = {
        body: '',
    }

    const [sendMessage] = useMutation(SEND_MESSAGE)

    const { onChange, onSubmit, values } = useForm(sendMessageCallback, initialState)

    function sendMessageCallback() {
        sendMessage({
            variables: {
                conversationId: chatId,
                ...values,
            },
            update: (cache, data) => {
                console.log(data)
                resizableInput.current.value = initialState.body
            },
        })
    }

    const resizableInput = useResizableInput({ maxHeight: 200 })

    return (
        <Form style={{ flexGrow: 0 }} onSubmit={onSubmit} onChange={onChange}>
            <StyledInput placeholder={'Aa'} name="body" as="textarea" ref={resizableInput} />
            <BlueButton>
                <FontAwesomeIcon icon={faPaperPlane} />
            </BlueButton>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    padding: 1em;
    align-items: center;
`
const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
`
