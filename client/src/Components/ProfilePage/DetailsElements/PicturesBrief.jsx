import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function PicturesBrief({ pictures }) {

    const PictureLink = ({ picture }) => {
        return (
            <PictureContainer to={`/image/${picture.id}`}>
                <Picture img={picture.urls.medium}></Picture>
            </PictureContainer>
        )
    }

    return (
        <Container>
            {pictures.map(picture => <PictureLink key={picture.id} picture={picture} />)}
        </Container>
    )
}

const PictureContainer = styled(Link)`
    display:block;
    width:100%;
    
    overflow:hidden;
    box-shadow:${props => props.theme.standardShadow};
`
const Picture = styled.div`
    background-position:center;
    background-size:cover;
    background-image: url(${props => props.img});
    width:100%;
    padding-bottom:100%;
    transition: transform .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    ${PictureContainer}:hover & {
        transform:scale(1.3);
    }

`

const Container = styled.div`
    margin: 1em 0;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:1em;

`