import React from 'react'
import styled from 'styled-components'
import ElementContainer from './ElementContainer'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function PushNotification({ visible }) {
    return (
        <CSSTransition in={visible} timeout={400} >
            <DissmisabeContainer>
                <ElementContainer>testowy content</ElementContainer>
            </DissmisabeContainer>
        </CSSTransition>
    )
}

const DissmisabeContainer = styled.div`
    position: fixed;
    z-index: 10;
    right: 2em;
    bottom: 2em;

    &.enter {
        opacity: 0;
    }
    &.enter-active {
        opacity: 1;
        transition: opacity 200ms;
    }
    &.exit {
        opacity: 1;
    }
    &.exit-active {
        opacity: 0;
        transition: opacity 200ms;
    }
`
