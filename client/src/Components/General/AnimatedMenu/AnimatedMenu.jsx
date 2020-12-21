import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import useResizeObserver from '../../../Util/Hooks/useResizeObserver'

const timeout = 500;

export default function AnimatedMenu({ active, setActive, main, subMenus, ...rest }) {

    const [height, setHeight] = useState(null)
    const animationContainer = useRef(null)



    const calcHeight = (el) => {
        if (el) {
            const height = el.offsetHeight + parseFloat(getComputedStyle(el.parentElement).paddingTop) + parseFloat(getComputedStyle(el.parentElement).paddingBottom);
            setHeight(height)
        }
    }

    useResizeObserver({
        callback: (element) => {
            //we dont wanna cast this function onto node that exits the view
            if (element && !element.classList.contains('menu-primary-exit') && !element.classList.contains('menu-secondary-exit'))
                calcHeight(element)
        },
        element: animationContainer
    })


    return (
        <Container style={{ height: height }} {...rest}>
            <CSSTransition
                in={active === main.props.value}
                appear
                timeout={timeout}
                classNames='menu-primary'
                onEnter={calcHeight}
            >
                <AnimationContainer ref={animationContainer} >
                    {main}
                </AnimationContainer>
            </CSSTransition>

            {subMenus.map(menu => (
                <CSSTransition
                    key={menu.props.value}
                    in={active === menu.props.value}
                    onEnter={calcHeight}
                    unmountOnExit
                    timeout={timeout}
                    classNames='menu-secondary'
                >
                    <AnimationContainer >
                        {menu}
                    </AnimationContainer>
                </CSSTransition>
            ))}
        </Container>
    )
}

const Container = styled.div`

transition: min-height ${timeout}ms, height ${timeout}ms;
 overflow:hidden;
 position:relative;
 min-width:16em;
`

const AnimationContainer = styled.div`
width:100%;

&.menu-primary-enter {
    
  transform: translateX(-110%);
}
&.menu-primary-enter-active {
    
    transform: translateX(0);
    transition: transform ${timeout}ms;
}
&.menu-primary-exit {
    position:absolute;
    transform: translateX(0);
}
&.menu-primary-exit-active {
    position:absolute;
    transform: translateX(-110%);
    transition: transform ${timeout}ms;
}
&.menu-primary-exit-done {
    position:absolute;
    transform: translateX(-110%);
    transition: transform ${timeout}ms;
}

&.menu-secondary-enter {
  
  transform: translateX(110%);
}
&.menu-secondary-enter-active {
    
    transform: translateX(0);
    transition: transform ${timeout}ms;
}
&.menu-secondary-exit {
    top:0;
    position:absolute;
    transform: translateX(0);
}
&.menu-secondary-exit-active {
   
    transform: translateX(110%);
    transition: transform ${timeout}ms;
}


`
