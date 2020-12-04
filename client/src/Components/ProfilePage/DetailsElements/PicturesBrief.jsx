import React from 'react'
import styled from 'styled-components'
import PictureLink from '../../General/PictureLink'

export default function PicturesBrief({ pictures }) {

    return (
        <Container>
            {pictures.map(picture => <PictureLink key={picture.id} picture={picture} />)}
        </Container>
    )
}

const Container = styled.div`
    margin: 1em 0;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:1em;

`