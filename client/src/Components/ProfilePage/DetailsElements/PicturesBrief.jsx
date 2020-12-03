import React from 'react'
import styled from 'styled-components'

export default function PicturesBrief({ pictures }) {

    return (
        <Container>
            {pictures.map(picture => <Picture key={picture.id} img={picture.urls.medium} />)}
        </Container>
    )
}

const Picture = styled.div`
    display:block;
    width:100%;
    padding-bottom:100%;
    
    background-position:center;
    background-size:cover;
    background-image: url(${props => props.img});

`

const Container = styled.div`
    margin: 1em 0;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:1em;

`