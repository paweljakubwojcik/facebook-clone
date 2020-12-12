import React from 'react'
import styled from 'styled-components'

import PictureLink from '../../General/PictureLink'


const max = 9

export default function PicturesBrief({ pictures }) {

    const imagesLeft = pictures.length - max

    return (
        <Container>
            {pictures.slice(0, max).map((picture, index) =>
                <Element>
                    <PictureLink key={picture.id} picture={picture} />
                    {index === max - 1 && <MoreImages>{imagesLeft}</MoreImages>}
                </Element>
            )}
        </Container>
    )
}

const Container = styled.div`
    margin: 1em 0;
    display:grid;
    grid-template-columns: repeat(auto-fit,minmax(30%,1fr));
    gap:1em;

`

const Element = styled.div`
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
`