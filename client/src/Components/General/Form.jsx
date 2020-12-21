import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { RoundButton } from './Buttons'


export default function Form({ toggleForm, onSubmit, onChange, header, children, ...rest }) {
    return (
        <StyledForm onSubmit={onSubmit} onChange={onChange}>
            <Header>
                <h2>{header}</h2>
                <XButton onClick={() => toggleForm(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </XButton>
            </Header>
            {
                children
            }

        </StyledForm>
    )
}


const StyledForm = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding: 1em 2em;
    width:500px;
    border-radius:.5em;
    h2{
        padding:.6em;
        text-align:center;
        border-bottom:solid 1px #ffffff22;
        width:100%;
    }
    h3{
        margin:.5em;
    }
    .userInfo{
        display:flex;
        width:100%;
        align-items:center;
        margin:.5em;
    }
`
const Header = styled.div`
    width:100%;
    position:relative;

`

const XButton = styled(RoundButton)`
    position:absolute;
    right:0;
    bottom:5px;

`