import React from 'react'
import styled from 'styled-components'

export default function Input({ type, label }) {
    return (
        <InputContainer className="input__container">
            <label htmlFor={label}>{label}</label>
            <MyInput type={type} id={label} name={label} />
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