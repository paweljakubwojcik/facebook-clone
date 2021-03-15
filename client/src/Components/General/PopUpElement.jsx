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
    showUnder,
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
                            showUnder={showUnder}
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
        if (props.showAbove || props.showUnder) return `50%;`
        if (props.showLeft) return `0`
    }};

    top: ${(props) => {
        if (props.showRight) return `50%;`
        if (props.showAbove) return `0;`
        if (props.showLeft) return `50%;`
        if (props.showUnder) return `100%;`
    }};

    transform: translate(-105%, -50%);
    ${(props) => {
        if (props.showRight) return `transform: translate(0, -50%);`
        if (props.showAbove) return `transform: translate(-50%, -100%);`
        if (props.showUnder) return `transform: translate(-50%, 0%);`
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
        left: 100%;
        top: 50%;
        transform: translate(0, -50%);
        ${(props) => {
            if (props.showRight)
                return `left: 0;
                        top: 50%;
                        transform: translate(0, -50%);`
            if (props.showAbove)
                return `left: 50%;
                        top: 100%;
                        transform: translate(-50%, -90%);`
            if (props.showUnder)
                return `left: 50%;
                        top: 0%;
                        transform: translate(-50%, -70%);`
        }};
        width: 3em;
        height: 3em;
        z-index: -1;
    }
`

PopUpElement.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    showRight: PropTypes.bool,
    showAbove: PropTypes.bool,
    showLeft: PropTypes.bool,
}
