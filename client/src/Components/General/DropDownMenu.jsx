import styled from 'styled-components'

import React from 'react'

export default function DropDownMenu({ children, small, ...rest }) {
    return (
        <>
            <Container small={small}>

                <Menu {...rest}>
                    {children}
                </Menu>

            </Container>
            <LittleSquare />
        </>
    )
}

//TODO: fix positioning of it

const Container = styled.div`
    position:absolute;
    z-index:3;
    right:${props => props.small ? '0' : '0'};
    top:100%;

`

const Menu = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    padding:.5em;
    font-size:.8em;
    width:max-content;
    background-color: ${props => props.theme.primaryElementColor};
    border-radius:.5em;
    border: solid 1px  ${props => props.theme.borderColor};
    box-shadow: ${props => props.theme.standardShadow};
    overflow:hidden;
    transition: height .5s;

`

const LittleSquare = styled.div`

        position:absolute;
        z-index:100;
        display:block;
        background-color:inherit;
        width:10px;
        height:10px;
        transform-origin:center center;
        transform:rotate(45deg) translate(0,-70%);
        top:100%;
        right:1em;
        
       // box-shadow:inherit;
        border-top: solid 1px  ${props => props.theme.borderColor};
        border-left: solid 1px  ${props => props.theme.borderColor};
`