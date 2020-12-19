import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { ThemeContext } from '../../Context/theme'
import { AuthContext } from '../../Context/auth'

import { useUserSettings } from '../../Util/Hooks/useUserSettings'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faMoon, faAddressCard, faEye, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import DropDownMenu from '../General/DropDownMenu'
import SubMenu from './SubMenu'
import RadioButtons from './RadioButtons'
import { MenuButton } from '../General/Buttons'

import { menuOptions } from './menuOptions'

export default function UserMenu({ ...rest }) {
    const { logout } = useContext(AuthContext)

    const history = useHistory()

    const [active, setActive] = useState(menuOptions.MAIN)
    const [height, setHeight] = useState(null)

    const calcHeight = (el) => {
        const height = el.offsetHeight + parseFloat(getComputedStyle(el.parentElement).paddingTop) + parseFloat(getComputedStyle(el.parentElement).paddingBottom);
        setHeight(height)
    }

    const handleLogout = () => {
        logout()
        history.push('/')
    }

    return (
        <DropDownMenu {...rest} style={{ height: height }}>
            <CSSTransition
                in={active === menuOptions.MAIN}
                appear
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
                onEnter={calcHeight}
            >
                <AnimationContainer>
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
                </AnimationContainer>
            </CSSTransition>
            <CSSTransition
                in={active === menuOptions.DISPLAY_PREFERENCES}
                onEnter={calcHeight}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
            >
                <AnimationContainer>
                    <DisplayMenu setActive={setActive} />
                </AnimationContainer>
            </CSSTransition>

            <CSSTransition
                in={active === menuOptions.POST_OPTIONS}
                onEnter={calcHeight}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
            >
                <AnimationContainer>
                    <PostMenu setActive={setActive} />
                </AnimationContainer>
            </CSSTransition>
        </DropDownMenu>
    )
}


const DisplayMenu = ({ setActive }) => {
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
        <SubMenu title={'Display Settings'} setActive={setActive} >
            <RadioButtons
                handleClick={handleClick}
                buttons={buttons}
                currentValue={themeName}
                name={'Theme'}
                icon={faMoon}
            />
        </SubMenu>
    )
}

const PostMenu = ({ setActive }) => {

    const { user } = useContext(AuthContext)
    const { setSettings, settings } = useUserSettings(user.id)

    const handleClick = (e) => {
        e.target.blur()
        setSettings('postDefaultPrivacy', e.target.value)
    }

    const buttons = [
        {
            key: 'Private',
            value: 'private'
        },
        {
            key: 'Public',
            value: 'public'
        },
        {
            key: 'Friends Only',
            value: 'friendsOnly'
        }
    ]

    return (
        <SubMenu title={'Post Options'} setActive={setActive} >
            <RadioButtons
                handleClick={handleClick}
                buttons={buttons}
                currentValue={settings.postDefaultPrivacy}
                name={'Default Visibility'}
                icon={faEye}
            />
        </SubMenu>
    )
}





const AnimationContainer = styled.div`
width:16em;

&.menu-primary-enter {
    
  transform: translateX(-110%);
}
&.menu-primary-enter-active {
    
    transform: translateX(0);
    transition: transform 500ms;
}
&.menu-primary-exit {
    position:absolute;
    transform: translateX(0);
}
&.menu-primary-exit-active {
   
    transform: translateX(-110%);
    transition: transform 500ms;
}

&.menu-secondary-enter {
  
  transform: translateX(110%);
}
&.menu-secondary-enter-active {
    
    transform: translateX(0);
    transition: transform 500ms;
}
&.menu-secondary-exit {
   
    transform: translateX(0);
}
&.menu-secondary-exit-active {
    position:absolute;
    transform: translateX(110%);
    transition: transform 500ms;
}


`