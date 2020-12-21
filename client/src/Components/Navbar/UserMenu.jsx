import React, { forwardRef, useContext, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { ThemeContext } from '../../Context/theme'
import { AuthContext } from '../../Context/auth'

import { useUserSettings } from '../../Util/Hooks/useUserSettings'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faMoon, faAddressCard, faEye, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import SubMenu from '../General/AnimatedMenu/SubMenu'
import RadioButtons from '../General/AnimatedMenu/RadioButtons'
import AnimatedMenu from '../General/AnimatedMenu/AnimatedMenu'
import DropDownMenu from '../General/DropDownMenu'
import { MenuButton } from '../General/Buttons'

import { menuOptions } from './menuOptions'



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
                <MenuButton onClick={() => setActive(menuOptions.DISPLAY_PREFERENCES)} >
                    <FontAwesomeIcon className="icon" icon={faMoon} />
                    <p>Display Preferences</p>
                    <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </MenuButton>
                <MenuButton onClick={() => setActive(menuOptions.POST_OPTIONS)} >
                    <FontAwesomeIcon className="icon" icon={faAddressCard} />
                    <p>Post Options</p>
                    <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </MenuButton>
                <MenuButton onClick={handleLogout}>
                    <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                    <p>Log Out</p>
                </MenuButton>
            </SubMenuContainer>)
    }

    const DisplayMenu = () => {
        const { user } = useContext(AuthContext)
        const { changeTheme, themeName } = useContext(ThemeContext)
        const { setSettings } = useUserSettings(user.id)

        const handleClick = (e) => {
            e.target.blur()
            changeTheme(e.target.value)
            setSettings('preferredTheme', e.target.value)
        }

        const buttons = [
            {
                key: 'Dark',
                value: 'darkTheme'
            },
            {
                key: 'Light',
                value: 'lightTheme'
            }
        ]

        return (
            <SubMenuContainer>
                <SubMenu title={'Display Settings'} setActive={setActive} >
                    <RadioButtons
                        handleClick={handleClick}
                        buttons={buttons}
                        currentValue={themeName}
                        name={'Theme'}
                        icon={faMoon}
                    />
                </SubMenu>
            </SubMenuContainer>
        )
    }

    const PostMenu = () => {

        const { user } = useContext(AuthContext)
        const { setSettings, settings } = useUserSettings(user.id)

        const handleClick = (e) => {
            e.target.blur()
            setSettings('postDefaultPrivacy', e.target.value)
        }

        const buttons = [
            {
                key: 'Private',
                value: 'PRIVATE'
            },
            {
                key: 'Public',
                value: 'PUBLIC'
            },
            {
                key: 'Friends Only',
                value: 'FRIENDS_ONLY'
            }
        ]

        return (
            <SubMenuContainer>
                <SubMenu title={'Post Options'} setActive={setActive} >
                    <RadioButtons
                        handleClick={handleClick}
                        buttons={buttons}
                        currentValue={settings?.postDefaultPrivacy}
                        name={'Default Visibility'}
                        icon={faEye}
                    />
                </SubMenu>
            </SubMenuContainer>
        )
    }

    return (
        <DropDownMenu {...rest} ref={ref}>
            <AnimatedMenu
                active={active}
                setActive={setActive}
                main={<MainMenu value={menuOptions.MAIN} />}
                subMenus={[
                    <DisplayMenu value={menuOptions.DISPLAY_PREFERENCES} />,
                    <PostMenu value={menuOptions.POST_OPTIONS} />
                ]}
            />
        </DropDownMenu>
    )
})

export default UserMenu

const SubMenuContainer = styled.div`

    padding:.5em;
    width:max-content;
    width:100%;

`