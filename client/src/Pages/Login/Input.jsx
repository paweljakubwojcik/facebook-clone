import React from 'react'
import styled from 'styled-components'

export default function Input({ type, label, name, value, onChange, error }) {
    return (
        <InputContainer className="input__container">
            <label htmlFor={name}>{label}</label>
            <MyInput type={type} id={label} name={name} value={value} onChange={onChange} onInput={onChange} autoComplete="off" error={error} />
            {error && <Error>{error}</Error>}
        </InputContainer>
    )
}


const MyInput = styled.input`
    color:inherit;
    font-size:1.2em;
    width:15em;
    padding:.5em;
    border-radius:1em;
    background-color: ${props => props.theme.secondaryElementColor};
    opacity:.6;
    border: 1px solid ${props => props.error ? '#9f0000' : 'transparent'};

    &:focus{
        opacity:1;
    }
`

const InputContainer = styled.div`
    font-family:inherit;
    font-weight:bold;
    margin:.5em 0;
    display:flex;
    flex-direction:column;
    label{
        margin:.5em;
    }
`

const Error = styled.div`
    color:#ff4a4a;
    font-size:.8em;
    font-weight:normal;
`