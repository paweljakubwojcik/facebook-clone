import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import face from '../styles/images/face.jpg'
import logo from '../styles/svg/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBell } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import Avatar from './Avatar'
import Button from './Button'




export default function Navbar() {
    return (
        <NavBar className='navBar'>
            <header>
                <Link to='./'>
                    <img src={logo} alt="Fake Facebook" />
                    <h1>Fake Facebook</h1>
                </Link>
            </header>
            <Link to='./'>
                <UserLink className='avatar'>
                    <Avatar image={face} altText='not anonymus faker' />
                    <div className="username">
                        Użytkownik
                    </div>
                </UserLink>
            </Link>
            <Menu className='menu'>
                <MenuButton className='menu__button'>
                    <FontAwesomeIcon className='icon' icon={faFacebookMessenger} />
                </MenuButton>
                <MenuButton className='menu__button'>
                    <FontAwesomeIcon className='icon' icon={faBell} />
                </MenuButton>
                <MenuButton className='menu__button'>
                    <FontAwesomeIcon className='icon' icon={faCaretDown} />
                </MenuButton>
            </Menu>
        </NavBar>
    )
}

const NavBar = styled.nav`

    position:sticky;
    top:0px;
    left:0;
    z-index:2;

    display:flex;
    width:100%;
    align-items:center;
    background-color: ${props => props.theme.primaryElementColor}ee; // no its not a typo, ee is responsible for opacity like #ffffff + ee
    border-bottom: solid 1px ${props => props.theme.secondaryElementColor}dd;

    header{
        margin: .3em auto .3em 1em;
        a{
            display:flex;
            align-items:center;
        }
        h1{
            margin: 0 1em;
        }
        img{
            height:50px;
        }
    }
`
//TODO component to be extracted
const UserLink = styled.div`

    display:flex;
    justify-content:space-evenly;
    align-items:center;

    border-radius:1em;
    padding:5px;

    transition: background-color .3s;

    &:hover{
        background-color:#444648;
        cursor:pointer;
    }

    .username{
        font-size:.8em;
        margin: .5em 1em;
        font-weight:bold;
    }
`

const Menu = styled.menu`
    display:flex;
    padding:0;
    margin:0;
    font-size:1.4em;
`

const MenuButton = styled(Button)`
    border-radius:50%;
    width:40px;
    height:40px;
    transition: background-color .4s ;
    &:hover{
        background-color:${props => props.theme.secondaryElementColor};
    }
    .icon{
        margin:0;
    }
`