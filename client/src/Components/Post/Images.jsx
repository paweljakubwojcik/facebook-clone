import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import PictureLink from '../General/PictureLink'


export default function Images({ images }) {


    const [compensativePadding, setPadding] = useState(null)
    const container = useRef(null)

    useEffect(() => {
        let padding = parseFloat(getComputedStyle(container.current.parentElement).paddingLeft)
        setPadding(padding)
    }, [container])

    return (
        <ImageContainer ref={container} com={compensativePadding}>
            {images.map(img =>
                <ImageElement key={img.id}>
                    <PictureLink picture={img} />
                </ImageElement>)}
        </ImageContainer>
    )
}


const ImageContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:calc(100% + ${props => props.com * 2}px);
    transform: translateX(-${props => props.com}px);
    margin: .5em 0;

`

const ImageElement = styled.div`
    display:block;
    flex-grow:1;
    min-width:10em;
    max-width:40em;

`
