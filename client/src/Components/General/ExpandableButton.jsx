import React, { useRef, useEffect, useState } from 'react'

import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RoundButton } from './Buttons'


const getChildrenWidth = (element) => {
    const length = Array.from(element.children)
        .map(el => el.clientWidth + parseInt(getComputedStyle(el)['margin-left']) + parseInt(getComputedStyle(el)['margin-right']))
        .reduce((a, b) => a + b)
    return length + parseInt(getComputedStyle(element)['padding-left']) + + parseInt(getComputedStyle(element)['padding-right'])
}

export default function ExpandableButton({ children, icon, ...rest }) {


    const [dimensions, setDimensions] = useState({})

    const roundButton = useRef(null)

    useEffect(() => {
        const width = getChildrenWidth(roundButton.current)
        const height = roundButton.current.clientHeight
        setDimensions({
            width,
            height
        })
    }, [])

    return (
        <StyledButton ref={roundButton} width={dimensions.width} height={dimensions.height} {...rest}>
            <Text>{children}</Text>
            <FontAwesomeIcon icon={icon} className='icon'></FontAwesomeIcon>
        </StyledButton>
    )
}

const StyledButton = styled(RoundButton)`

    border-radius:${props => props.height / 2}px;
    justify-content:right;
    transition: width .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow:hidden;
    position:relative;
   .icon{
       margin:.4em;
       transition: color .4s;
   }

    &:hover,
    &:focus{
        width:${props => props.width}px;
        .icon{
            color:${props => props.theme.primaryColor};
        }
    }
    @media (max-width:700px){
        width:max-content;
    }
`

const Text = styled.p`
    font-weight:bold;
    font-size:.8em;
    display:flex;
    flex-wrap:none;
    min-width:max-content;
    margin:.6em;
`