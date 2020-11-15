import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Avatar from './Avatar'

const animDuration = 300;

export default function UserLink({ user, isVisible }) {
    return (
        <SwitchTransition>
            <CSSTransition
                key={isVisible}
                timeout={animDuration}
                classNames="fade"
                in={true}
                appear={true}>
                <>
                    {isVisible && (
                        <StyledLink to={`./profile/${user.id}`} className='avatar'>
                            <LittleBackground image={user?.backgroundImage} />
                            <Avatar image={user?.profileImage?.medium} big />
                            <div>
                                <div className="username">
                                    {user?.username || "User"}
                                </div>
                                <p>
                                    some info about user
                                </p>
                            </div>
                        </StyledLink>
                    )}
                </>
            </CSSTransition>
        </SwitchTransition>
    )
}

const LittleBackground = styled.div`
    position:absolute;
    z-index:-1;
    width:100%;
    height:50%;
    top:0;
    left:0;
    background-image: url(${props => props.image});
    background-size:cover;
    background-position:center;
    filter:brightness(.7);
`

const StyledLink = styled(Link)`

    position:absolute;
    z-index:3;
    left:0;
    top:0;

    height:160px;

    transform: translate(-105%, -25%);

    display:grid;
    grid-template-columns:1fr 2fr;
    justify-items:left;
    align-items:center;

    background-color:${props => props.theme.primaryElementColor};

    transition: filter ${animDuration}ms;

    border: solid 1px ${props => props.theme.secondaryFontColor};
    border-radius:1em;
    padding:.5em;

    overflow:hidden;

    &:hover{
        filter:brightness(1.5);
        cursor:pointer;
    }

    .username{
        font-size:1em;
        margin: .5em 1em;
        font-weight:bold;
        min-width:100px;
    }

    p{
        margin:.5em 1em;
        padding:0;
        color: ${props => props.theme.secondaryFontColor};
        font-size:.7em;
    }

    &.fade-enter {
            opacity: 0;

    }
    &.fade-enter-active {
        opacity: 1;
    transition: opacity ${animDuration}ms;
    }
    
    &.fade-exit {
     opacity: 1;
    }
    &.fade-exit-active {
    opacity: 0;
    transition: opacity ${animDuration}ms;
    }


`
