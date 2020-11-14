import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { SwitchTransition, CSSTransition, TransitionGroup } from 'react-transition-group'

import { SquareButton } from '../General/Buttons'
import RadioButtons from './RadioButtons'
import UserButton from '../General/UserButton'

let navBarHeight;

export default function ProfileMenu({ width, contentType, setContentType, user }) {

    const containerBar = useRef(null)
    const [sticky, setSticky] = useState(false)

    const handleScroll = () => {

        const containerPosition = containerBar.current.getBoundingClientRect().top
        if (containerPosition - navBarHeight <= 0)
            setSticky(true)
        else
            setSticky(false)
    }

    useEffect(() => {
        navBarHeight = document.querySelector('.navBar').clientHeight
        console.log(navBarHeight)
        window.addEventListener('scroll', handleScroll)
        setSticky(false)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <>
            <div ref={containerBar}></div>
            <ContainerBar top={navBarHeight}>
                <Menu width={width}>
                    <TransitionGroup component={null}>
                        <CSSTransition
                            key={sticky}
                            timeout={200}
                            classNames='rollUp'>
                            {!sticky ?
                                <RadioButtons className='buttons' setContentType={setContentType} contentType={contentType} />
                                :
                                <UserButton className='user' onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }} user={user} notLink />}
                        </CSSTransition>
                    </TransitionGroup>

                    <Buttons>
                        <SquareButton>Add to friends</SquareButton>
                        <SquareButton>Send message</SquareButton>
                    </Buttons>
                </Menu>
            </ContainerBar>
        </>
    )
}

const ContainerBar = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    background-color: ${props => props.theme.primaryElementColor};
    position: sticky;
    height:60px;
    top:${props => props.top}px;
`

const Menu = styled.div`
    display:flex;
    width:100%;
    max-width: ${props => props.width}px;
    border-top: solid 1px ${props => props.theme.secondaryFontColor}; 
    overflow:hidden;
    position:relative;


    .buttons.rollUp-enter {
    position:absolute;
    transform:translateY(-100%);
    }
    .user.rollUp-enter {
    position:absolute;
    transform:translateY(100%);
    }
    .buttons.rollUp-enter-active {
    transform:translateY(0);
    transition: transform 200ms;
    }
    .user.rollUp-enter-active {
    transform:translateY(0);
    transition: transform 200ms;
    }
    .buttons.rollUp-exit {
    transform:translateY(0);
    }
    .user.rollUp-exit {
    transform:translateY(0);
    }
    .buttons.rollUp-exit-active {
        position:absolute;
    transform:translateY(-100%);
    transition: transform 200ms;
    }
    .user.rollUp-exit-active {
    position:absolute;
    transform:translateY(100%);
    transition: transform 200ms;
    }
`

const Buttons = styled.div`
    display:flex;
    margin-left:auto;
`

