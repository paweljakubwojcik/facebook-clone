import React from 'react'
import styled from 'styled-components'
import PictureLink from '../../../Components/General/PictureLink'

export default function Pictures({ images }) {
    return (
        <ImageContainer>
            {images.map((img) => (
                <ImageElement key={img.id}>
                    <PictureLink picture={img} fullSize />
                </ImageElement>
            ))}
        </ImageContainer>
    )
}
const ImageContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
    grid-template-rows: repeat(auto-fit, 300px);
    gap: 1em;
    width: 100%;
    margin: 0.5em 0;
    margin-bottom: 10%;

    @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
        grid-template-rows: repeat(auto-fit, 200px);
    }
`
const ImageElement = styled.div`
    display: flex;
    justify-content: center;
`
