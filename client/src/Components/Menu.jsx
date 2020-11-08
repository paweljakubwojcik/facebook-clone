import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBell } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import UserMenu from './UserMenu'

const buttons = [
    {
        value: 'messenger',
        icon: faFacebookMessenger
    },
    {
        value: 'notification',
        icon: faBell
    },
    {
        value: 'usermenu',
        icon: faCaretDown
    },
]

export default function Menu() {

    useEffect(() => {
        window.addEventListener('click', closeMenu)
        return () => {
            window.removeEventListener('click', closeMenu)
        }
    }, [])

    const [activeButton, changeActive] = useState('')

    const toggleActive = (e) => {
        e.target.blur()
        if (activeButton === e.target.value)
            changeActive('')
        else
            changeActive(e.target.value)
    }

    const closeMenu = (e) => {
        //TODO
    }

    return (
        <StyledMenu className='menu'>
            {buttons.map(({ value, icon }) =>
                <MenuButton className='menu__button' key={value} value={value} onClick={toggleActive} active={value === activeButton ? 1 : 0}>
                    <FontAwesomeIcon className='icon' icon={icon} />
                </MenuButton>
            )}
            {activeButton === buttons[2].value && <UserMenu />}
        </StyledMenu>
    )
}


const StyledMenu = styled.menu`
    display:flex;
    padding:0;
    margin:0;
    font-size:1.4em;
    position:relative;
`

const MenuButton = styled.button`

    display:flex;
    justify-content:center;
    align-items:center;
    margin: .4em;
    font-size:1em;
    border:none;
    color:${props => props.theme.primaryFontColor};
    background-color:${props => props.theme.roundButtonColor};
    transition: filter .2s ,color .4s, background-color .4s ;
    &:hover,
    &:focus{
        cursor:pointer;
        filter:brightness(1.1);
    }
    &:active{
        filter:brightness(.9);
    }

    background-color:${props => props.active && props.theme.activeButtonColor};
    color: ${props => props.active && props.theme.primaryFontColors};
    border-radius:50%;
    width:40px;
    height:40px;
    .icon{
        margin:0;
        pointer-events:none;
    }
`