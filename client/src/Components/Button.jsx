import React from 'react'
import styled from 'styled-components'

const blur = (e) => {
    e.target.blur()
}

export default function Button(props) {
    return (
        <MyButton onClick={blur}>
            { props.children}
        </MyButton>
    )
}

export const MyButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    margin: .4em;
    font-size:1em;
    background-color:transparent;
    border:none;
    color:${props => props.theme.secondaryFontColor};
    transition: scale .1s ,color .4s ;
    &:hover,
    &:focus{
        cursor:pointer;
        color:${props => props.theme.primaryFontColor};
    }
`