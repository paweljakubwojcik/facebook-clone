import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import PopUpElement from '../General/PopUpElement'
import PopUpList from './PopUpList'

// TODO: ograniczyć wyświetlanie gdy likeów jest bardzo dużo

export default function LikesCounter({ likesCount, likes, ...rest }) {

    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    const isVisible = isHovered && likesCount !== 0;

    return (
        <CounterLikes {...rest} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FontAwesomeIcon className="icon" icon={faThumbsUp} />
            {likesCount}
            <PopUpElement isVisible={isVisible} showRight>
                <PopUpList list={likes}></PopUpList>
            </PopUpElement>
        </CounterLikes>
    )
}

const CounterLikes = styled.div`
    color:inherit;
    position:relative;
    margin:1em;
    margin-right:auto;
    .icon{
        color:${props => props.theme.primaryColor};
        margin:0  0.5em;
    }
    &:hover{
        cursor:pointer;
        text-decoration:underline;
    }
`