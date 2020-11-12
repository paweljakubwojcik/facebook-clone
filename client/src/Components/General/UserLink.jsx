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
                        <StyledLink to={`./user/${user.username}`} className='avatar'>
                            <Avatar altText='not anonymus faker' big />
                            <div className="username">
                                {user?.username || "User"}
                            </div>
                        </StyledLink>
                    )}
                </>
            </CSSTransition>
        </SwitchTransition>
    )
}

const StyledLink = styled(Link)`

    position:absolute;
    z-index:3;
    left:0;
    top:0;


    transform: translate(-105%, -25%);

    display:flex;
    justify-content:left;
    align-items:center;

    background-color:${props => props.theme.primaryElementColor};

    border: solid 1px ${props => props.theme.secondaryFontColor};
    border-radius:1em;
    padding:5px;

    &:hover{
        background-color:#444648;
        cursor:pointer;
    }

    .username{
        font-size:.8em;
        margin: .5em 1em;
        font-weight:bold;
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
