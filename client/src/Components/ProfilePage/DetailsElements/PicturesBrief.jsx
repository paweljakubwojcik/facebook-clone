import React from 'react'
import styled from 'styled-components'

import PictureLink from '../../General/PictureLink'


const max = 9

export default function PicturesBrief({ pictures }) {

    return (
        <Container>
            {pictures.slice(0, max).map((picture, index) =>
                <Element>
                    <PictureLink key={picture.id} picture={picture} />
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
