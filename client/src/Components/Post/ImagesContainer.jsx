import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'



export default function ImagesContainer({ children, noCompensation }) {


    const [compensativePadding, setPadding] = useState(null)
    const container = useRef(null)

    useEffect(() => {
        let padding = parseFloat(getComputedStyle(container.current.parentElement).paddingLeft)
        setPadding(padding)
    }, [container])

    return (
        <ImageContainer ref={container} com={noCompensation ? '' : compensativePadding}>
            {children}
        </ImageContainer>
    )
}


const ImageContainer = styled.div`
     display:grid;
    grid-template-columns: repeat(auto-fit,minmax(33%,1fr));
    width:calc(100% + ${props => props.com * 2}px);
    transform: translateX(-${props => props.com}px);
    margin: .5em 0;

`

