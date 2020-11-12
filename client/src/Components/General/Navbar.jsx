import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import UserButton from './UserButton'
import logo from '../../styles/svg/logo.svg'


import Menu from './Menu'

import { AuthContext } from '../../Context/auth'


export default function Navbar() {

    const { user } = useContext(AuthContext)

    return (
        <NavBar className='navBar'>
            <header>
                <Link to='./'>
                    <img src={logo} alt="Fake Facebook" />
                    <h1>Fakebook</h1>
                </Link>
            </header>
            <Link to={`./profile/${user.username}`}>
                <UserButton user={user} notLink />
            </Link>
            <Menu />
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


