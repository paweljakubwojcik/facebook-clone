import styled from 'styled-components'

import React from 'react'

import FormButton from '../../Components/General/FormButton'

export default function Form({ children, ...rest }) {
    return <StyledForm {...rest}>{children}</StyledForm>
}

Form.Input = ({ type, label, name, value, onChange, error }) => {
    return (
        <InputContainer>
            <label htmlFor={name}>{label}</label>
            <MyInput type={type} id={label} name={name} value={value} onChange={onChange} onInput={onChange} autoComplete="off" error={error} />
            {error && <Error>{error}</Error>}
        </InputContainer>
    )
}

Form.Title = styled.h2`
    font-size: 2em;
    width: 100%;
    text-align: center;
`

Form.Button = FormButton

Form.Row = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
    font-size: 0.9em;
    p {
        opacity: 0.8;
        margin: 0 0.3em;
    }
`

Form.ChangeFormButton = ({ children, ...rest }) => {
    return (
        <StyledChangeFormButton role="button" {...rest}>
            {children}
        </StyledChangeFormButton>
    )
}

const StyledChangeFormButton = styled.div`
    font-weight: bold;
    opacity: 1;
    &:hover,
    &:focus {
        cursor: pointer;
        filter: brightness(2);
    }
`

const StyledForm = styled.form`
    justify-self: center;
    align-self: center;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MyInput = styled.input`
    color: inherit;
    font-size: 1.2em;
    width: 15em;
    padding: 0.5em;
    border-radius: 1em;
    background-color: ${(props) => props.theme.secondaryElementColor};
    opacity: 0.6;
    border: 1px solid ${(props) => (props.error ? '#9f0000' : 'transparent')};

    &:focus {
        opacity: 1;
    }
`

const InputContainer = styled.div`
    font-family: inherit;
    font-weight: bold;
    margin: 0.5em 0;
    display: flex;
    flex-direction: column;
    label {
        margin: 0.5em;
    }
`

const Error = styled.div`
    color: #ff4a4a;
    font-size: 0.8em;
    font-weight: normal;
`
