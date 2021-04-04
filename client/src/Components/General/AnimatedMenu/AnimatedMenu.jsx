import React, { useState, useRef, useContext, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import useResizeObserver from '../../../Util/Hooks/useResizeObserver'

const timeout = 500

export const AnimationContext = createContext({
    calcHeight: null,
    active: 'main',
})

export default function AnimatedMenu({ children, active, subMenus, ...rest }) {
    const [height, setHeight] = useState(null)

    const calcHeight = (el) => {
        if (el) {
            const height =
                el.offsetHeight +
                parseFloat(getComputedStyle(el.parentElement).paddingTop) +
                parseFloat(getComputedStyle(el.parentElement).paddingBottom)
            setHeight(height)
        }
    }

    const [main, setMain] = useState('main')

    return (
        <Container style={{ height: height }} {...rest}>
            <AnimationContext.Provider
                value={{
                    calcHeight,
                    active,
                    main,
                    setMain,
                }}
            >
                {children}
            </AnimationContext.Provider>
        </Container>
    )
}

const PrimaryMenu = ({ children, value, ...rest }) => {
    const { calcHeight, active, setMain } = useContext(AnimationContext)
    const animationContainer = useRef(null)

    useEffect(() => {
        setMain(value)
    }, [value, setMain])

    useResizeObserver({
        callback: (element) => {
            //we dont wanna cast this function onto node that exits the view
            if (element && !element.classList.contains('menu-exit')) calcHeight(element)
        },
        element: animationContainer,
    })

    return (
        <CSSTransition
            in={active === value}
            appear
            timeout={timeout}
            classNames="menu"
            onEnter={calcHeight}
            {...rest}
        >
            <AnimationContainer.Primary ref={animationContainer}>
                {children}
            </AnimationContainer.Primary>
        </CSSTransition>
    )
}
PrimaryMenu.propTypes = {
    value: PropTypes.string.isRequired,
}
AnimatedMenu.Primary = PrimaryMenu

const SecondaryMenu = ({ children, value, ...rest }) => {
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
        <CSSTransition
            key={value}
            in={active === value}
            onEnter={calcHeight}
            unmountOnExit
            timeout={timeout}
            classNames="menu"
            {...rest}
        >
            <AnimationContainer.Secondary ref={animationContainer}>
                {children}
            </AnimationContainer.Secondary>
        </CSSTransition>
    )
}
SecondaryMenu.propTypes = {
    value: PropTypes.string.isRequired,
}
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
