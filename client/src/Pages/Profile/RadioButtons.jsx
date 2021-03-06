import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { SquareButton } from '../../Components/General/Buttons'
import { getOffsetPosition } from '../../Util/Methods'
import types from './contentTypes'

const buttons = Object.values(types).map((value) => {
    return { value: value }
})

export default function RadioButtons({ contentType, ...rest }) {
    const [indicatorOffset, setOffset] = useState(-0.5)
    const [indicatorWidth, setWidth] = useState(0)
    const activeButton = useRef()
    const history = useHistory()

    useEffect(() => {
        // to get consistent position even when resizing
        const fontSize = parseFloat(getComputedStyle(document.body).fontSize)
        setWidth(activeButton.current.clientWidth / fontSize)
        setOffset(getOffsetPosition(activeButton.current).x / fontSize)

        return () => {}
    }, [contentType])

    const handleOnClick = (e) => {
        history.push({
            hash: `#${e.target.value}`,
        })
        e.target.blur()
    }

    return (
        <Container {...rest}>
            {buttons.map(({ value }) => (
                <RadioButton
                    key={value}
                    value={value}
                    active={value === contentType}
                    onClick={handleOnClick}
                    ref={value === contentType ? activeButton : null}
                >
                    {value.toUpperCase()}
                </RadioButton>
            ))}
            <Indicator offset={indicatorOffset} width={indicatorWidth}></Indicator>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    position: relative;
    overflow: visible;
`

const RadioButton = styled(SquareButton)`
    padding: 1em;
    color: ${(props) => (props.active ? props.theme.primaryColor : props.theme.primaryFontColor)};
`

const Indicator = styled.span`
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => props.width}em;
    height: 5px;
    background-color: ${(props) => props.theme.primaryColor};
    border-radius: 0.3em 0.3em 0 0;
    transform: translateX(${(props) => props.offset}em);
    transition: transform 0.4s, width 0.6s;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
`
