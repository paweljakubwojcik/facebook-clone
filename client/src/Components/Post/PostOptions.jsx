import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RoundButton } from '../General/Buttons'
import PostOptionsMenu from './postOptionsMenu'

import { checkIfContains } from '../../Util/Methods'

export default function PostOptions({ post, isDeletable }) {

    const [open, setopen] = useState(false)

    const toggleOpen = (e) => {
        e.target.blur()
        setopen(!open)
    }

    const dropDownMenu = useRef(null)
    const optionButton = useRef(null)

    const closePostMenu = (e) => {
        if (e.target !== dropDownMenu.current
            && e.target !== optionButton.current
            && !checkIfContains(dropDownMenu.current, e))
            setopen(false)

    }
    useEffect(() => {
        if (open)
            window.addEventListener('click', closePostMenu)
        else
            window.removeEventListener('click', closePostMenu)
        return () => {
            window.removeEventListener('click', closePostMenu)
        }
    }, [open])


    return (
        <>
            <OptionButton onClick={toggleOpen} ref={optionButton}></OptionButton>
            {open &&
                <PostOptionsMenu isDeletable={isDeletable} post={post} ref={dropDownMenu} />
            }
        </>
    )
}

const OptionButton = styled(RoundButton)`
    background-color:transparent;
    margin-left:auto;
    &:hover{
        background-color: ${props => props.theme.roundButtonColor};
    }
    &::after{
        content:"";
        display:block;
        width:.2em;
        height:.2em;
        border-radius:50%;
        background-color:${props => props.theme.secondaryFontColor};
        box-shadow: .5em 0 ${props => props.theme.secondaryFontColor},
                    -.5em 0 ${props => props.theme.secondaryFontColor};
    }
    
`