import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBell } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import UserMenu from './UserMenu'
import { RoundButton } from './Buttons'

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

const MenuButton = styled(RoundButton)`

    
`