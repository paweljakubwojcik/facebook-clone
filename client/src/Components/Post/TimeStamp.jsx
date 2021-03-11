import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styled from 'styled-components/macro'

import PopUpElement from '../General/PopUpElement'

dayjs.extend(relativeTime)

export default function TimeStamp({ time, ...rest }) {
    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    const date = dayjs(time).format('MMMM Do YYYY, h:mm:ss a')

    return (
        <Stamp
            tabIndex="0"
            onMouseEnter={handleMouseEnter}
            onFocus={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onBlur={handleMouseLeave}
            {...rest}
        >
            {dayjs(time).fromNow()}
            <PopUpElement isVisible={isHovered} showRight>
                <Time>{date}</Time>
            </PopUpElement>
        </Stamp>
    )
}

const Stamp = styled.div`
    position: relative;
    width: fit-content;
    font-size: 0.7em;
    color: ${(props) => props.theme.secondaryFontColor};
    &:hover,
    &:focus {
        text-decoration: underline;
        cursor: pointer;
    }
`

const Time = styled.div`
    position: relative;
    left: 5%;
    padding: 0.5em;
    border-radius: 0.5em;
    color: black;
    background-color: #ebe9e9dd;
    pointer-events: none;
    width: max-content;
`
