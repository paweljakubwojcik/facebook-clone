import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { SquareButton } from '../General/Buttons'


import { getOffsetPosition } from '../../Util/Methods'
import types from './contentTypes'

const buttons = Object.values(types).map(value => { return { value: value } })



export default function RadioButtons({ setContentType, contentType, ...rest }) {

    const [indicatorOffset, setOffset] = useState(-120)
    const [indicatorWidth, setWidth] = useState(0)
    const activeButton = useRef()

    useEffect(() => {

        setWidth(activeButton.current.clientWidth)
        setOffset(getOffsetPosition(activeButton.current).x)

        return () => {

        }
    }, [contentType])

    const handleOnClick = (e) => {
        setContentType(e.target.value)
        e.target.blur()

    }

    return (
        <Container {...rest} >
            {buttons.map(({ value }) =>
                <RadioButton key={value}
                    value={value}
                    active={value === contentType}
                    onClick={handleOnClick}
                    ref={value === contentType ? activeButton : null}
                >
                    {value.toUpperCase()}
                </RadioButton>)}
            <Indicator offset={indicatorOffset} width={indicatorWidth}></Indicator>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    position:relative;
`

const RadioButton = styled(SquareButton)`
    padding:1em;
    color: ${props => props.active ? props.theme.primaryColor : props.theme.primaryFontColor};
`

const Indicator = styled.span`
    display:block;
    position:absolute;
    bottom:0;
    left:0;
    width:${props => props.width}px;
    height:5px;
    background-color:${props => props.theme.primaryColor};
    transform: translateX(${props => props.offset}px);
    transition: transform .4s, width .6s;
`

