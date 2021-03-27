import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import styled from 'styled-components'

import FormButton from '../General/FormButton'
import UserButton from '../General/UserButton'
import Menu from './Menu'
import Header from './Header'
import PushNotification from '../General/PushNotification'

import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'
import { GET_COUNTERS } from '../../Util/GraphQL_Queries'
import { useQuery } from '@apollo/client'

import { maxTablet } from '../../styles/breakpoints'

export default function Navbar() {
    const location = useLocation()
    const { user, loading, isLogged } = useCurrentUser()

    const { data: { user: { notificationCount } = {} } = {} } = useQuery(GET_COUNTERS, {
        variables: {
            userId: user?.id,
        },
        pollInterval: 500,
    })

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
                    {!loading &&
                        (user ? (
                            <>
                                <MediaQuery width={740}>
                                    <UserButton
                                        user={user}
                                        notLink
                                        as={Link}
                                        to={`/profile/${user.id}`}
                                    />
                                </MediaQuery>
                                <Menu
                                    counters={{ messages: 0, notifications: notificationCount }}
                                />
                            </>
                        ) : (
                            loggingButtons
                        ))}
                </div>
            </NavBar>
            <PushNotification />
        </>
    )
}

const NavBar = styled.nav`
    position: ${(props) => (!props.isCovered ? 'sticky' : 'static')};
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

    @media (max-width: ${maxTablet}) {
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
