import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const animDuration = 300;

export default function PopUpElement({ isVisible, children, ...rest }) {
    return (
        <SwitchTransition>
            <CSSTransition
                key={isVisible}
                timeout={animDuration}
                classNames="fade">
                <>
                    {isVisible && <Container {...rest}> {children}</Container>}
                </>
            </CSSTransition>
        </SwitchTransition>
    )
}

const Container = styled.div`
    position:absolute;
    z-index:3;
    left:0;
    top:0;

    transform: translate(-105%, -50%);

    //css animations here
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

    //invisible extension for hover
    &::after{
        content:'';
        display:block;
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(0,-50%);
        width:80%;
        height:40%;
        z-index:-1;
    }

`