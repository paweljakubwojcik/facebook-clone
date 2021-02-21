import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { RoundButton } from './Buttons'
import FormButton from './FormButton'

export default function Form({ children, ...rest }) {
    return <StyledForm {...rest}>{children}</StyledForm>
}

Form.Header = ({ toggleForm, children, ...rest }) => {
    return (
        <StyledHeader {...rest}>
            <h2>{children}</h2>
            <XButton onClick={() => toggleForm(false)}>
                <FontAwesomeIcon icon={faTimes} />
            </XButton>
        </StyledHeader>
    )
}

Form.Button = FormButton

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em;
    width: 500px;
    border-radius: 0.5em;
    h2 {
        padding: 0.6em;
        text-align: center;
        border-bottom: solid 1px #ffffff22;
        width: 100%;
    }
    h3 {
        margin: 0.5em;
    }
    .userInfo {
        display: flex;
        width: 100%;
        align-items: center;
        margin: 0.5em;
    }
`
const StyledHeader = styled.div`
    width: 100%;
    position: relative;
`

const XButton = styled(RoundButton)`
    position: absolute;
    right: 0;
    bottom: 5px;
`
