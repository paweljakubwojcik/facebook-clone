import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faMoon, faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../Context/auth'
import { MenuButton, RoundButton } from '../General/Buttons'
import { DropDownMenu } from '../General/DropDownMenu'

export default function UserMenu({ ...rest }) {
    const { logout } = useContext(AuthContext)
    const history = useHistory()

    const [active, setActive] = useState('main')
    const [height, setHeight] = useState(null)

    const calcHeight = (el) => {
        const height = el.offsetHeight + parseFloat(getComputedStyle(document.body).fontSize);
        setHeight(height)
        console.log(el)
    }

    const handleLogout = () => {
        logout()
        history.push('/')
    }

    return (
        <DropDownMenu {...rest} style={{ height: height }}>
            <CSSTransition
                in={active === 'main'}
                appear
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
                onEnter={calcHeight}
            >
                <AnimationContainer>
                    <MenuButton onClick={handleLogout}>
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                        <p>Log Out</p>
                    </MenuButton>
                    <MenuButton onClick={() => setActive('Display Preferences')} >
                        <FontAwesomeIcon className="icon" icon={faMoon} />
                        <p>Display Preferences</p>
                        <FontAwesomeIcon className="icon" icon={faChevronRight} />
                    </MenuButton>
                </AnimationContainer>
            </CSSTransition>
            <CSSTransition
                in={active === 'Display Preferences'}
                onEnter={calcHeight}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
            >
                <AnimationContainer>
                    <Header>
                        <RoundButton onClick={() => setActive('main')}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </RoundButton>
                        <h3>Display Preferences</h3>
                    </Header>
                    <MenuButton >
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                        <p>Log Out</p>
                    </MenuButton>
                </AnimationContainer>
            </CSSTransition>
        </DropDownMenu>
    )
}

const Header = styled.div`

    display:flex;
    align-items:center;
    padding:.4em;
    h3{
        margin:.5em;
    }

`

const AnimationContainer = styled.div`
width:100%;

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

