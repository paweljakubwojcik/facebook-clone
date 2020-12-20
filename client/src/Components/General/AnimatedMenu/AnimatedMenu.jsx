import React, { useState } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import DropDownMenu from '../DropDownMenu'

export default function AnimatedMenu({ active, setActive, main, subMenus, ...rest }) {

    const [height, setHeight] = useState(null)

    const calcHeight = (el) => {
        const height = el.offsetHeight + parseFloat(getComputedStyle(el.parentElement).paddingTop) + parseFloat(getComputedStyle(el.parentElement).paddingBottom);
        setHeight(height)
    }

    return (
        <DropDownMenu {...rest} style={{ height: height }}>
            <CSSTransition
                in={active === main.props.value}
                appear
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
                onEnter={calcHeight}
            >
                <AnimationContainer>
                    {main}
                </AnimationContainer>
            </CSSTransition>

            {subMenus.map(menu => (
                <CSSTransition
                    key={menu.props.value}
                    in={active === menu.props.value}
                    onEnter={calcHeight}
                    unmountOnExit
                    timeout={500}
                    classNames='menu-secondary'
                >
                    <AnimationContainer>
                        {menu}
                    </AnimationContainer>
                </CSSTransition>
            ))}
        </DropDownMenu>
    )
}

const AnimationContainer = styled.div`
width:16em;

&.menu-primary-enter {
    
  transform: translateX(-110%);
}
&.menu-primary-enter-active {
    
    transform: translateX(0);
    transition: transform 500ms;
}
&.menu-primary-exit {
    position:absolute;
    transform: translateX(0);
}
&.menu-primary-exit-active {
   
    transform: translateX(-110%);
    transition: transform 500ms;
}

&.menu-secondary-enter {
  
  transform: translateX(110%);
}
&.menu-secondary-enter-active {
    
    transform: translateX(0);
    transition: transform 500ms;
}
&.menu-secondary-exit {
   
    transform: translateX(0);
}
&.menu-secondary-exit-active {
    position:absolute;
    transform: translateX(110%);
    transition: transform 500ms;
}


`
