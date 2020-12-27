import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'

import PopUpElement from '../General/PopUpElement'


export default function TimeStamp({ time }) {

    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    const date = moment(time).format('MMMM Do YYYY, h:mm:ss a');

    return (
        <Stamp tabIndex='0' className="timestamp"
            onMouseEnter={handleMouseEnter}
            onFocus={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onBlur={handleMouseLeave}>
            {moment(time).fromNow()}
            <PopUpElement isVisible={isHovered} showRight>
                <Time>{date}</Time>
            </PopUpElement>
        </Stamp>
    )
}


const Stamp = styled.div`
        position:relative;
        width:fit-content;
            font-size:.7em;
            color:${props => props.theme.secondaryFontColor};
            &:hover,
            &:focus{
                text-decoration:underline;
                cursor:pointer;
            }
`

const Time = styled.div`
    position:relative;
    left:5%;
    padding:.5em;
    border-radius:.5em;
    color:black;
    background-color:#ebe9e9dd;
    pointer-events:none;
    width:max-content;

`