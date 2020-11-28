import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBell } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import UserMenu from './UserMenu'
import { RoundButton } from '../General/Buttons'

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


    const [activeButton, changeActive] = useState('')

    const toggleActive = (e) => {
        if (activeButton === e.target.value)
            changeActive('')
        else
            changeActive(e.target.value)
    }

    const closeMenu = (e) => {
        if (!e.target.classList.contains('openMenu')
            && !e.target.classList.contains('menu')
            && !e.target.classList.contains('menu__button')
            && e.target.localName !== 'button')
            toggleActive(e)
    }

    useEffect(() => {
        window.addEventListener('click', closeMenu)
        return () => {
            window.removeEventListener('click', closeMenu)
        }
    }, [])

    return (
        <StyledMenu className='menu'>
            {buttons.map(({ value, icon }) =>
                <MenuButton
                    className='menu__button'
                    key={value}
                    value={value}
                    onClick={(e) => { e.target.blur(); toggleActive(e) }}
                    active={value === activeButton ? 1 : 0} aria-label={value}>
                    <FontAwesomeIcon className='icon' icon={icon} />
                </MenuButton>
            )}
            {activeButton === buttons[2].value && <UserMenu className='openMenu' />}
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

const MenuButton = RoundButton