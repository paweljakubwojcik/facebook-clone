import React from 'react'
import styled from 'styled-components'
import PictureLink from '../General/PictureLink'


export default function Pictures({ images }) {
    return (
        <ImageContainer >
            {images.map(img =>
                <ImageElement key={img.id}>
                    <PictureLink picture={img} fullSize />
                </ImageElement>)}
        </ImageContainer>
    )
}
const ImageContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:100%;
    margin: .5em 0;

`
const ImageElement = styled.div`
    display:block;
    flex-grow:1;

`