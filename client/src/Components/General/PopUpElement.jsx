import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const animDuration = 300

export default function PopUpElement({
    isVisible,
    noExtension,
    showRight,
    showLeft,
    showAbove,
    children,
    delay = 0,
    ...rest
}) {
    return (
        <SwitchTransition>
            <CSSTransition
                key={isVisible}
                timeout={animDuration + delay}
                classNames="fade"
                unmountOnExit
            >
                <>
                    {isVisible && (
                        <Container
                            {...rest}
                            delay={delay}
                            noExtension={noExtension}
                            showRight={showRight}
                            showAbove={showAbove}
                            showLeft={showLeft}
                        >
                            {children}
                        </Container>
                    )}
                </>
            </CSSTransition>
        </SwitchTransition>
    )
}

const Container = styled.div`
    position: absolute;
    z-index: 3;
    left: ${(props) => {
        if (props.showRight) return `100%;`
        if (props.showAbove) return `50%;`
        if (props.showLeft) return `0`
    }};

    top: 50%;

    transform: translate(-105%, -50%);
    ${(props) => {
        if (props.showRight) return `transform: translate(0, -50%);`
        if (props.showAbove) return `transform: translate(-50%, -100%);`
    }}

    //css animations here
    &.fade-enter {
        opacity: 0;
    }
    &.fade-enter-active {
        opacity: 1;
        transition: opacity ${animDuration}ms ${(props) => props.delay}ms;
    }

    &.fade-exit {
        opacity: 1;
    }
    &.fade-exit-active {
        opacity: 0;
        transition: opacity ${animDuration}ms ${(props) => props.delay}ms;
    }

    //invisible extension for hover
    &::after {
        ${(props) => (!props.noExtension ? `content: '' ` : '')};
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(50%, -50%);
        ${(props) => (props.showRight ? `transform: translate(-100%, -50%);` : '')}
        width:50%;
        height: 40%;
        z-index: -1;
    }
`

PopUpElement.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    showRight: PropTypes.bool,
    showAbove: PropTypes.bool,
    showLeft: PropTypes.bool,
}
