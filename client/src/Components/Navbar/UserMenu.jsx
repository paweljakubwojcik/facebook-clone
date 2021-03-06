import React, { forwardRef, useContext, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { ThemeContext } from '../../Context/theme'
import { AuthContext } from '../../Context/auth'

import { useUserSettings } from '../../Util/Hooks/useUserSettings'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSignOutAlt,
    faMoon,
    faAddressCard,
    faEye,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import SubMenu from '../General/AnimatedMenu/SubMenu'
import RadioButtonsGroup from '../General/AnimatedMenu/RadioButtons'
import AnimatedMenu from '../General/AnimatedMenu/AnimatedMenu'
import DropDownMenu from '../General/DropDownMenu'
import { MenuButton } from '../General/Buttons'

import { menuOptions } from './menuOptions'
import PrivacyMenu from '../General/PrivacyMenu'
import { CurrentUserContext } from '../../Context/currentUserContext'

const UserMenu = forwardRef(({ ...rest }, ref) => {
    const history = useHistory()

    const [active, setActive] = useState(menuOptions.MAIN)

    const MainMenu = () => {
        const { logout } = useContext(AuthContext)
        const handleLogout = () => {
            logout()
            history.push('/')
        }
        return (
            <SubMenuContainer>
                <MenuButton onClick={() => setActive(menuOptions.DISPLAY_PREFERENCES)}>
                    <FontAwesomeIcon className="icon" icon={faMoon} />
                    <p>Display Preferences</p>
                    <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </MenuButton>
                <MenuButton onClick={() => setActive(menuOptions.POST_OPTIONS)}>
                    <FontAwesomeIcon className="icon" icon={faAddressCard} />
                    <p>Post Options</p>
                    <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </MenuButton>
                <MenuButton onClick={handleLogout}>
                    <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                    <p>Log Out</p>
                </MenuButton>
            </SubMenuContainer>
        )
    }

    const DisplayMenu = () => {
        const { changeTheme, themeName } = useContext(ThemeContext)

        const handleClick = (e) => {
            e.target.blur()
            changeTheme(e.target.value)
        }

        const buttons = [
            {
                key: 'Dark',
                value: 'darkTheme',
            },
            {
                key: 'Light',
                value: 'lightTheme',
            },
        ]

        return (
            <SubMenuContainer>
                <SubMenu title={'Display Settings'} setActive={setActive}>
                    <RadioButtonsGroup currentValue={themeName} name={'Theme'}>
                        <RadioButtonsGroup.Header icon={faMoon}>Theme</RadioButtonsGroup.Header>
                        {buttons.map(({ key, value }) => (
                            <RadioButtonsGroup.Button value={value} onClick={handleClick} key={key}>
                                {key}
                            </RadioButtonsGroup.Button>
                        ))}
                    </RadioButtonsGroup>
                </SubMenu>
            </SubMenuContainer>
        )
    }

    const PostMenu = () => {
        const {
            user: { settings },
            setSettings,
        } = useContext(CurrentUserContext)

        return (
            <SubMenuContainer>
                <SubMenu title={'Post Options'} setActive={setActive}>
                    <PrivacyMenu
                        setPrivacy={(privacy) => setSettings('postDefaultPrivacy', privacy)}
                        currentPrivacy={settings?.postDefaultPrivacy}
                    >
                        <RadioButtonsGroup.Header icon={faEye}>
                            Default privacy
                        </RadioButtonsGroup.Header>
                    </PrivacyMenu>
                </SubMenu>
            </SubMenuContainer>
        )
    }

    return (
        <DropDownMenu {...rest} ref={ref}>
            <AnimatedMenu active={active} setActive={setActive}>
                <AnimatedMenu.Primary value={menuOptions.MAIN}>
                    <MainMenu />
                </AnimatedMenu.Primary>
                <AnimatedMenu.Secondary value={menuOptions.DISPLAY_PREFERENCES}>
                    <DisplayMenu />
                </AnimatedMenu.Secondary>
                <AnimatedMenu.Secondary value={menuOptions.POST_OPTIONS}>
                    <PostMenu />
                </AnimatedMenu.Secondary>
            </AnimatedMenu>
        </DropDownMenu>
    )
})

export default UserMenu

const SubMenuContainer = styled.div`
    padding: 0.5em;
    width: max-content;
    width: 100%;
`
