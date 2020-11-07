import React from 'react'
import styled from 'styled-components'

export default function Button(props) {
    return (
        <MyButton>
            { props.children}
        </MyButton>
    )
}

export const MyButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    flex:1;
    margin: .4em;
    font-size:1em;
    background-color:transparent;
    border:none;
    color:${props => props.theme.secondaryFontColor};
    .icon{
        margin:.5em;
    }
    transition: color .4s ;
    &:hover{
        cursor:pointer;
        color:${props => props.theme.primaryFontColor};
    }
`