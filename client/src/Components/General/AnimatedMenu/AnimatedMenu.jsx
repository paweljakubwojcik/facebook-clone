import React, { useState, useRef, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import useResizeObserver from '../../../Util/Hooks/useResizeObserver'

const timeout = 500

const AnimationContext = createContext({
    calcHeight: null,
    active: 'main',
})

export default function AnimatedMenu({ children, active, main, subMenus, ...rest }) {
    const [height, setHeight] = useState(null)
    const animationContainer = useRef(null)

    const calcHeight = (el) => {
        if (el) {
            const height =
                el.offsetHeight + parseFloat(getComputedStyle(el.parentElement).paddingTop) + parseFloat(getComputedStyle(el.parentElement).paddingBottom)
            setHeight(height)
        }
    }

    useResizeObserver({
        callback: (element) => {
            //we dont wanna cast this function onto node that exits the view
            if (element && !element.classList.contains('menu-exit')) calcHeight(element)
        },
        element: animationContainer,
    })

    return (
        <Container style={{ height: height }} {...rest}>
            <AnimationContext.Provider
                value={{
                    calcHeight,
                    active,
                }}
            >
                {children}
            </AnimationContext.Provider>
        </Container>
    )
}

const PrimaryMenu = ({ children, value, ...rest }) => {
    const { calcHeight, active } = useContext(AnimationContext)
    const animationContainer = useRef(null)

    useResizeObserver({
        callback: (element) => {
            //we dont wanna cast this function onto node that exits the view
            if (element && !element.classList.contains('menu-exit')) calcHeight(element)
        },
        element: animationContainer,
    })

    return (
        <CSSTransition in={active === value} appear timeout={timeout} classNames="menu" onEnter={calcHeight}>
            <AnimationContainer.Primary ref={animationContainer}>{children}</AnimationContainer.Primary>
        </CSSTransition>
    )
}
PrimaryMenu.propTypes = {
    value: PropTypes.string.isRequired,
}

const SecondaryMenu = ({ children, value, ...rest }) => {
    const { calcHeight, active } = useContext(AnimationContext)

    return (
        <CSSTransition key={value} in={active === value} onEnter={calcHeight} unmountOnExit timeout={timeout} classNames="menu">
            <AnimationContainer.Secondary>{children}</AnimationContainer.Secondary>
        </CSSTransition>
    )
}

SecondaryMenu.propTypes = {
    value: PropTypes.string.isRequired,
}
AnimatedMenu.Primary = PrimaryMenu
AnimatedMenu.Secondary = SecondaryMenu

const Container = styled.div`
    transition: min-height ${timeout}ms, height ${timeout}ms;
    overflow: hidden;
    position: relative;
    min-width: 16em;
`

const AnimationContainer = styled.div`
    width: 100%;
`

AnimationContainer.Primary = styled(AnimationContainer)`
    &.menu-enter {
        transform: translateX(-110%);
    }
    &.menu-enter-active {
        transform: translateX(0);
        transition: transform ${timeout}ms;
    }
    &.menu-exit {
        position: absolute;
        transform: translateX(0);
    }
    &.menu-exit-active {
        position: absolute;
        transform: translateX(-110%);
        transition: transform ${timeout}ms;
    }
    &.menu-exit-done {
        position: absolute;
        transform: translateX(-110%);
        transition: transform ${timeout}ms;
    }
`

AnimationContainer.Secondary = styled(AnimationContainer)`
    &.menu-enter {
        transform: translateX(110%);
    }
    &.menu-enter-active {
        transform: translateX(0);
        transition: transform ${timeout}ms;
    }
    &.menu-exit {
        top: 0;
        position: absolute;
        transform: translateX(0);
    }
    &.menu-exit-active {
        transform: translateX(110%);
        transition: transform ${timeout}ms;
    }
`
