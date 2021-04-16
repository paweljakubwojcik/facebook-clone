import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBell } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import UserMenu from './UserMenu'
import { RoundButton } from '../General/Buttons'

import { checkIfContains } from '../../Util/Methods'
import Notifications from './Notifications'

import { GET_COUNTERS } from '../../Util/GraphQL_Queries'
import { useQuery } from '@apollo/client'

export default function Menu({ user, ...rest }) {
    const { data: { user: { notificationCount } = {} } = {} } = useQuery(GET_COUNTERS, {
        variables: {
            userId: user?.id,
        },
        pollInterval: 1000,
    })

    const messagesCount = 0

    const buttons = [
        {
            value: 'messenger',
            icon: faFacebookMessenger,
            counter: messagesCount,
        },
        {
            value: 'notification',
            icon: faBell,
            counter: notificationCount,
        },
        {
            value: 'usermenu',
            icon: faCaretDown,
        },
    ]

    const menu = useRef(null)

    const [activeButton, changeActive] = useState('')

    const toggleActive = (e) => {
        if (activeButton === e.target.value) changeActive('')
        else changeActive(e.target.value)
    }

    const closeMenu = (e) => {
        if (
            !e.target.classList.contains('openMenu') &&
            !e.target.classList.contains('menu') &&
            !e.target.classList.contains('menu__button') &&
            menu.current &&
            !checkIfContains(menu.current, e)
        ) {
            changeActive('')
        }
    }

    useEffect(() => {
        if (activeButton !== '') window.addEventListener('click', closeMenu)
        else window.removeEventListener('click', closeMenu)
        return () => {
            window.removeEventListener('click', closeMenu)
        }
    }, [activeButton])

    return (
        <StyledMenu className="menu" {...rest}>
            {buttons.map(({ value, icon, counter }) => (
                <MenuButton
                    className="menu__button"
                    key={value}
                    value={value}
                    onClick={(e) => {
                        e.target.blur()
                        toggleActive(e)
                    }}
                    active={value === activeButton ? 1 : 0}
                    aria-label={value}
                    counter={counter}
                >
                    <FontAwesomeIcon className="icon" icon={icon} />
                </MenuButton>
            ))}

            <UserMenu className="openMenu" ref={menu} visible={activeButton === buttons[2].value} />

            <Notifications
                className="openMenu"
                count={notificationCount}
                ref={menu}
                visible={activeButton === buttons[1].value}
            />
        </StyledMenu>
    )
}

const StyledMenu = styled.menu`
    display: flex;
    padding: 0;
    margin: 0;
    font-size: 1.4em;
    position: relative;
`

const MenuButton = styled(RoundButton)`
    position: relative;
    &::after {
        ${(props) => (props.counter ? `content:'${props.counter}'` : '')};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.5em;
        padding: 0.3em;
        position: absolute;
        background-color: ${(props) => props.theme.primaryColor};
        width: 1em;
        height: 1em;
        border-radius: 50%;
        top: -10%;
        right: -10%;
    }
`
