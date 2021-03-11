import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import PopUpElement from '../General/PopUpElement'
import PopUpList from './PopUpList'

import icons from '../../Util/Constants/reactionsIcons'

// TODO: ograniczyć wyświetlanie gdy likeów jest bardzo dużo

export default function LikesCounter({ reactionsCount, reactions, ...rest }) {

    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    const areThereAnyLikes = reactionsCount !== 0;
    const isVisible = isHovered && areThereAnyLikes;


    return (
        <CounterLikes {...rest} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} blue={areThereAnyLikes}>
            <FontAwesomeIcon className="icon" icon={faThumbsUp} />
            {reactionsCount}
            <PopUpElement isVisible={isVisible} showUnder>
                <PopUpList list={reactions}></PopUpList>
            </PopUpElement>
        </CounterLikes>
    )
}

const CounterLikes = styled.div`
    color: ${props => props.blue ? props.theme.primaryColor : 'inherit'};
    position:relative;
    margin:1em;
    margin-right:auto;
    .icon{
        color:${props => props.blue ? props.theme.primaryColor : 'inherit'};
        margin:0  0.5em;
    }
   
    &:hover{
        ${props => props.blue ?
        `cursor:pointer;
            text-decoration:underline;`
        : ''
        };
        
    }
`