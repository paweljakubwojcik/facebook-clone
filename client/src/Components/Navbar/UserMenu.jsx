import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { ThemeContext } from '../../Context/theme'
import { useMutation, gql } from '@apollo/client'
//TODO: CHANGING USER PREFERENCES IN DB

import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faMoon, faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../Context/auth'
import { MenuButton, RoundButton } from '../General/Buttons'
import { DropDownMenu } from '../General/DropDownMenu'

//TODO: Split functionalities
export default function UserMenu({ ...rest }) {
    const { logout, user } = useContext(AuthContext)

    const [logoutUser, { error }] = useMutation(LOGOUT, {
        variables: {
            userId: user.id
        },
        update: () => {
            logout()
            history.push('/')
        }
    })

    const { changeTheme, currentTheme } = useContext(ThemeContext)
    const history = useHistory()

    const [active, setActive] = useState('main')
    const [height, setHeight] = useState(null)
    const [settings, setSettings] = useState({
        theme: currentTheme
    })
    const [themeName, setThemeName] = useState(currentTheme)

    const calcHeight = (el) => {
        const height = el.offsetHeight + parseFloat(getComputedStyle(el.parentElement).paddingTop) + parseFloat(getComputedStyle(el.parentElement).paddingBottom);
        setHeight(height)
        console.log(el)
    }

    const handleLogout = () => {
        logoutUser()
    }

    const handleRadioButtonClick = (e) => {
        e.target.blur()
        setThemeName(e.target.value)
        changeTheme(e.target.value)
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
                    <MenuButton onClick={() => setActive('Display Preferences')} >
                        <FontAwesomeIcon className="icon" icon={faMoon} />
                        <p>Display Preferences</p>
                        <FontAwesomeIcon className="icon" icon={faChevronRight} />
                    </MenuButton>
                    <MenuButton onClick={handleLogout}>
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                        <p>Log Out</p>
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
                    <RadioButtonsGroup>
                        <div className="label">
                            <FontAwesomeIcon className="icon" icon={faMoon} />
                            <h4> Theme </h4>
                        </div>

                        <RadioButton value="darkTheme" onClick={handleRadioButtonClick} active={themeName === 'darkTheme'}>
                            <p>Dark</p>
                            <span>
                                <span></span>
                            </span>
                        </RadioButton>
                        <RadioButton value="lightTheme" onClick={handleRadioButtonClick} active={themeName === 'lightTheme'}>
                            <p>Light</p>
                            <span>
                                <span></span>
                            </span>
                        </RadioButton>
                    </RadioButtonsGroup>

                </AnimationContainer>
            </CSSTransition>
        </DropDownMenu>
    )
}

const LOGOUT = gql`
    mutation logout( $userId:ID! ){
        logout( userId:$userId )
        }

`

const RadioButtonsGroup = styled.div`
    .label{
        display:flex;
        align-items:center;
        svg{
            margin: 0 .4em 0 1.3em;
        }
       pointer-events:none;
       
    }
    h4{
        border-bottom:solid 1px ${props => props.theme.borderColor}; 
        margin:.5em;
        padding:.4em;
        flex-grow:1;
    }
    
`

const RadioButton = styled(MenuButton)`
    font-size:.8em;

    padding-left:3.5rem;
    justify-content:space-between;
    color:${props => props.active ? props.theme.primaryColor : 'inherit'};
    pointer-events: ${props => props.active ? 'none' : 'all'};
    span{
        color:inherit;
        display:flex;
        justify-content:center;
        align-items:center;
        border-width:1px;
        border-style:solid;
        border-color:inherit;
        width:1.4em;
        height:1.4em;
        border-radius:50%;
        margin:.5em;
        span{
            margin:0;
            content:'';
            display:block;
            border:none;
            background-color:${props => props.active ? props.theme.primaryColor : 'transparent'};
            width:50%;
            height:50%;
        }
    }

`

const Header = styled.div`

    display:flex;
    align-items:center;
    padding:.4em;
    h3{
        pointer-events:none;
        margin:.5em;
    }
    border-bottom:solid 1px ${props => props.theme.borderColor}; 

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

