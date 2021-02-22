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

Form.UserInfo = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0.5em;
`

Form.TextArea = styled.textarea`
    resize: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    font-family: inherit;
    background-color: transparent;
    border: none;
    width: 100%;
    height: 120px;
    padding: 0.5em 1em;
    flex-shrink: 0;
`

Form.FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledForm = styled.form`
    padding: 1em 2em;
`
const StyledHeader = styled.div`
    width: 100%;
    position: relative;
    h2 {
        padding: 0.6em;
        text-align: center;
        border-bottom: solid 1px #ffffff22;
        width: 100%;
    }
`

const XButton = styled(RoundButton)`
    position: absolute;
    right: 0;
    bottom: 5px;
`
