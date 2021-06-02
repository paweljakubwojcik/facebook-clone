import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import styled from 'styled-components'

import FormButton from '../General/FormButton'
import UserButton from '../General/UserButton'
import Menu from '../QuickMenu/Menu'
import Header from './Header'
import PushNotification from '../General/PushNotification'

import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'

import { MAX_TABLET_PX } from '../../styles/breakpoints'

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
        <>
            <NavBar className="navBar" isCovered={isCovered}>
                <Header isCovered={isCovered} />
                <div style={{ marginLeft: 'auto', display: 'flex' }}>
                    {!loading && (
                        <>
                            {user && (
                                <MediaQuery width={740}>
                                    <UserButton
                                        user={user}
                                        notLink
                                        as={Link}
                                        to={`/profile/${user.id}`}
                                    />
                                </MediaQuery>
                            )}
                            {isLogged && <Menu user={user} />}

                            {!isLogged && loggingButtons}
                        </>
                    )}
                </div>
            </NavBar>
            {/*  <PushNotification /> */}
        </>
    )
}

const NavBar = styled.nav`
    position: ${(props) => (props.isCovered ? 'static' : 'sticky')};
    top: 0;
    left: 0;
    z-index: 3;
    height: var(--navbar-height);
    padding: 0 1em;

    display: flex;

    width: 100%;
    align-items: center;
    background-color: ${(props) => props.theme.primaryElementColor};
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
    box-shadow: ${(props) => props.theme.standardShadow};

    @media (max-width: ${MAX_TABLET_PX}) {
        position: sticky;
        header .img {
            position: static;
        }
    }
`

const MediaQuery = styled.div`
    @media (max-width: ${(props) => props.width}px) {
        display: none;
    }
`
