import React, { useState } from 'react'
import styled from 'styled-components'
import { RoundButton, SquareButton } from '../General/Buttons'
import { PopUpMenu } from '../General/PopUpMenu'

import DeleteButton from './DeleteButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default function PostOptions({ postId }) {

    const [open, setopen] = useState(false)

    const toggleOpen = () => {
        setopen(!open)
    }

    return (
        <>
            <OptionButton onClick={toggleOpen}></OptionButton>
            {open &&
                <PopUpMenu>
                    <DeleteButton postId={postId} />
                    <SquareButton >
                        <FontAwesomeIcon icon={faEdit} />
                        Edit post
                    </SquareButton>
                </PopUpMenu>
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