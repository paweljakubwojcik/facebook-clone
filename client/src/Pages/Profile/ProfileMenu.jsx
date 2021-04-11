import React, { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { UserMatchContext } from './userMatchContext'
import { AuthContext } from '../../Context/auth'

import RadioButtons from './RadioButtons'
import UserButton from '../../Components/General/UserButton'
import ActionButtons from './ActionButtons'
import ElementContainer from '../../Components/General/ElementContainer'

let navBarHeight

export default function ProfileMenu({ width, contentType, user }) {
    const isViewerTheOwner = useContext(UserMatchContext)
    const context = useContext(AuthContext)
    const [friendshipState, setFriendshipState] = useState(null)

    const containerBar = useRef(null)
    const [sticky, setSticky] = useState(false)

    const handleScroll = () => {
        const containerPosition = containerBar.current?.getBoundingClientRect().top
        if (containerPosition - navBarHeight <= 0) setSticky(true)
        else setSticky(false)
    }

    useEffect(() => {
        navBarHeight = document.querySelector('.navBar').clientHeight - 1
        window.addEventListener('scroll', handleScroll)
        setSticky(false)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div ref={containerBar}></div>
            <ContainerBar top={navBarHeight}>
                <Menu width={width}>
                    <TransitionGroup component={null}>
                        <CSSTransition key={sticky} timeout={200} classNames="rollUp">
                            {!sticky ? (
                                <RadioButtons className="buttons" contentType={contentType} />
                            ) : (
                                <UserButton
                                    className="user"
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                    user={user}
                                    notLink
                                />
                            )}
                        </CSSTransition>
                    </TransitionGroup>
                    {!isViewerTheOwner && context.userId && (
                        <Buttons>
                            {friendshipState !== 'INVITING' && (
                                <ActionButtons
                                    user={user}
                                    state={friendshipState}
                                    setState={setFriendshipState}
                                />
                            )}
                        </Buttons>
                    )}
                </Menu>
            </ContainerBar>
            {friendshipState === 'INVITING' && (
                <ElementContainer style={{ width, margin: '1em auto', maxWidth: '100%' }} special>
                    <ActionButtons
                        user={user}
                        state={friendshipState}
                        setState={setFriendshipState}
                    />
                </ElementContainer>
            )}
        </>
    )
}

const Buttons = styled.div`
    display: flex;
    margin-left: auto;
    @media (max-width: 600px) {
        margin-right: 5px;
    }
`

const ContainerBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryElementColor};
    position: sticky;
    z-index: 1;
    height: 4em;
    top: ${(props) => props.top}px;
    overflow: hidden;
    box-shadow: ${(props) => props.theme.smallShadow};
`

const Menu = styled.div`
    display: flex;
    width: 100%;
    max-width: ${(props) => props.width}px;
    border-top: solid 1px ${(props) => props.theme.secondaryFontColor};
    overflow: visible;
    position: relative;

    .buttons.rollUp-enter {
        position: absolute;
        transform: translateY(-100%);
    }
    .user.rollUp-enter {
        position: absolute;
        transform: translateY(100%);
    }
    .buttons.rollUp-enter-active {
        transform: translateY(0);
        transition: transform 200ms;
    }
    .user.rollUp-enter-active {
        transform: translateY(0);
        transition: transform 200ms;
    }
    .buttons.rollUp-exit {
        transform: translateY(0);
    }
    .user.rollUp-exit {
        transform: translateY(0);
    }
    .buttons.rollUp-exit-active {
        position: absolute;
        transform: translateY(-100%);
        transition: transform 200ms;
    }
    .user.rollUp-exit-active {
        position: absolute;
        transform: translateY(100%);
        transition: transform 200ms;
    }
`
