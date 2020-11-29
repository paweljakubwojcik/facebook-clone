import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RoundButton, MenuButton } from '../General/Buttons'
import { DropDownMenu } from '../General/DropDownMenu'

import DeleteButton from './DeleteButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default function PostOptions({ postId }) {

    const [open, setopen] = useState(false)

    const toggleOpen = () => {
        setopen(!open)
    }

    const dropDownMenu = useRef(null)
    const optionButton = useRef(null)

    const closePostMenu = (e) => {
        if (e.target !== dropDownMenu.current
            && e.target !== optionButton.current
            && !(dropDownMenu.current?.contains(e.target))
        )
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
                <DropDownMenu small ref={dropDownMenu}>
                    <DeleteButton postId={postId} />
                    <MenuButton >
                    <FontAwesomeIcon icon={faEdit} /> <p>Edit post</p>
                    </MenuButton>
                </DropDownMenu>
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