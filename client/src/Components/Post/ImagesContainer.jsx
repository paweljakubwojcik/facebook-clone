import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { GenericButton } from '../General/Buttons'

const maxImages = 9;
export default function ImagesContainer({ children, noCompensation }) {
    
    const [fold, setFold] = useState(false)
    const [compensativePadding, setPadding] = useState(null)
    const container = useRef(null)

    useEffect(() => {
        let padding = parseFloat(getComputedStyle(container.current.parentElement).paddingLeft)
        setPadding(padding)
    }, [container])

    useEffect(() => {
        if (children.length > maxImages)
            setFold(true)
        else
            setFold(false)
    }, [children])


    const foldedContent = (
        children.slice(0, maxImages).map((child, index) =>
            <ImageElement key={child.key}>
                {child}
                {index === maxImages - 1 &&
                    <MoreImages onClick={() => setFold(false)}>
                    {children.length - maxImages}
                    </MoreImages>}
            </ImageElement>
        )
    )

    const unfoldedContent = (
        <>
            {children.map(child => <ImageElement key={child.key}>{child}</ImageElement>)}

        </>
    )

    return (
        <>
            <ImageContainer ref={container} com={noCompensation ? '' : compensativePadding}>
                {fold ? foldedContent : unfoldedContent}
            </ImageContainer>
            {!fold && children.length > maxImages && <GenericButton onClick={() => setFold(true)} style={{ marginLeft: 'auto', marginRight: 'auto' }}>show less</GenericButton>}
        </>
    )
}

ImagesContainer.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    noCompensation: PropTypes.bool,
}


const ImageContainer = styled.div`
     display:grid;
    grid-template-columns: repeat(auto-fit,minmax(33%,1fr));
    width:calc(100% + ${props => props.com * 2}px);
    transform: translateX(-${props => props.com}px);

`

const ImageElement = styled.div`

    position:relative;

`

const MoreImages = styled.div`

    display:flex;
    font-size:2em;
    font-weight:bold;
    position:absolute;
    top:0;
    left:0;
    background-color:#22222299;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
    &::before{
        content:"+";
    }
    &:hover{
        cursor: pointer;
    }

`

