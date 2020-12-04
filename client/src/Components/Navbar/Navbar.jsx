import React, { useContext } from 'react'
import PropsTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

import styled from 'styled-components'

import FormButton from '../General/FormButton'
import UserButton from '../General/UserButton'
import logo from '../../styles/svg/logo.svg'


import Menu from './Menu'

import { AuthContext } from '../../Context/auth'

//TODO: replace set Form prop with state in router
export default function Navbar({ setForm }) {

    const { user } = useContext(AuthContext)
    const location = useLocation()


    //navbar shouldn't be rendered on login page
    const shouldRender = location.pathname !== '/' || !!user

    const isCovered = location.pathname.split('/').some(el => el === 'image')

    const profileImage = localStorage.getItem('avatar')

    const loggingButtons = (
        <>
            <Link to={`/`} onClick={setForm.bind(this, 'login')}>
                <FormButton >Login</FormButton>
            </Link>
            <Link to={`/`} onClick={setForm.bind(this, 'register')}>
                <FormButton >Register</FormButton>
            </Link>
        </>
    )

    return shouldRender && (
        <NavBar className='navBar' isCovered={isCovered}>
            <header>
                <Link to='/'>
                    <img src={logo} alt="Fake Facebook" />
                    <MediaQuery width={400}>
                        {!isCovered && <h1>Fakebook</h1>}
                    </MediaQuery>

                </Link>
            </header>
            {user ? (
                <>
                    <MediaQuery width={740}>
                        <UserButton user={{ ...user, profileImage: { urls: { small: profileImage } } }}
                            notLink as={Link}
                            to={`/profile/${user.id}`}
                        />
                    </MediaQuery>
                    <Menu />
                </>
            ) : loggingButtons}
        </NavBar>
    )
}

Navbar.propsTypes = {
    setForm: PropsTypes.func
}

const NavBar = styled.nav`

    position:${props => !props.isCovered ? 'sticky' : 'static'};
    top:0;
    left:0;
    z-index:2;
    height:60px;
    padding: 0 1em;
    padding-left:1%;

    display:flex;
    width:100%;
    align-items:center;
    background-color: ${props => props.theme.primaryElementColor}; 
    border-bottom: solid 1px ${props => props.theme.borderColor};
    box-shadow: ${props => props.theme.standardShadow};

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
            height:40px;
            ${props => props.isCovered ? 'position:absolute; z-index:3; transform:translateX(100%);' : ''}
            transition: transform .5s;
        }
    }
`

const MediaQuery = styled.div`

    @media (max-width:${props => props.width}px){
        display:none;
    }

`


