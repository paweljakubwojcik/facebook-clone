import React from 'react'
import PropsTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

import styled from 'styled-components'

import FormButton from '../General/FormButton'
import UserButton from '../General/UserButton'
import { ReactComponent as Logo } from '../../styles/svg/logo.svg'

import Menu from './Menu'

import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'

export default function Navbar() {
    const location = useLocation()
    const { user, loading, isLogged } = useCurrentUser()

    //navbar shouldn't be rendered on login page
    const shouldRender = location.pathname !== '/' || isLogged

    const isCovered = location.pathname.split('/').some((el) => el === 'image')

    const loggingButtons = (
        <>
            <Link to={{ pathname: `/`, state: 'login' }}>
                <FormButton>Login</FormButton>
            </Link>
            <Link to={{ pathname: `/`, state: 'register' }}>
                <FormButton>Register</FormButton>
            </Link>
        </>
    )

    if (!shouldRender) return null

    return (
        <NavBar className="navBar" isCovered={isCovered}>
            <header>
                <Link to="/">
                    <Logo className="img" />
                    <MediaQuery width={400}>{!isCovered && <h1>Fakebook</h1>}</MediaQuery>
                </Link>
            </header>
            {!loading &&
                (user ? (
                    <>
                        <MediaQuery width={740}>
                            <UserButton user={user} notLink as={Link} to={`/profile/${user.id}`} />
                        </MediaQuery>
                        <Menu counters={{ messages: 0, notifications: user?.notificationCount }} />
                    </>
                ) : (
                    loggingButtons
                ))}
        </NavBar>
    )
}

Navbar.propsTypes = {
    setForm: PropsTypes.func,
}

const NavBar = styled.nav`
    position: ${(props) => (!props.isCovered ? 'sticky' : 'static')};
    top: 0;
    left: 0;
    z-index: 2;
    height: 60px;
    padding: 0 1em;
    padding-left: 1%;

    display: flex;

    width: 100%;
    align-items: center;
    background-color: ${(props) => props.theme.primaryElementColor};
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
    box-shadow: ${(props) => props.theme.standardShadow};

    header {
        margin: 0.3em auto 0.3em 1em;
        a {
            display: flex;
            align-items: center;
        }
        h1 {
            margin: 0 1em;
        }
        .img {
            height: 40px;
            color: ${(props) => props.theme.primaryColor};
            ${(props) =>
                props.isCovered ? 'position:absolute; z-index:3; transform:translateX(100%);' : ''}
            transition: transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }
`

const MediaQuery = styled.div`
    @media (max-width: ${(props) => props.width}px) {
        display: none;
    }
`
