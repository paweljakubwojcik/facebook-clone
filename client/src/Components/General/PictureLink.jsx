import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function PictureLink({ picture, fullSize }) {


    const render = fullSize ? (
        <PictureContainer to={`/image/${picture.id}`}>
            <PictureFullSize src={picture.urls.medium} />
        </PictureContainer>
    ) : (
            <PictureContainer to={`/image/${picture.id}`}>
                <Picture img={picture.urls.medium}></Picture>
            </PictureContainer>
        )

    return (
        render
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
    transform:scale(1.1);
    ${PictureContainer}:hover & {
        transform:scale(1.3);
    }

`

const PictureFullSize = styled.img`
     max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
`