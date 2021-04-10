import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function PictureLink({ picture, fullSize, ...rest }) {
    const render = fullSize ? (
        <PictureFullSize src={picture.urls.medium} />
    ) : (
        <Picture img={picture.urls.medium} />
    )

    return (
        <PictureContainer to={`/image/${picture.id}`} {...rest}>
            {render}
        </PictureContainer>
    )
}

const PictureContainer = styled(Link)`
    display: block;
    width: 100%;
    overflow: hidden;
    box-shadow: ${(props) => props.theme.standardShadow};
    &:hover {
        cursor: pointer;
    }
`
const Picture = styled.div`
    background-position: center;
    background-size: cover;
    background-image: url(${(props) => props.img});
    width: 100%;
    padding-bottom: 100%;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: scale(1.1);
    ${PictureContainer}:hover & {
        transform: scale(1.3);
    }
`

const PictureFullSize = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    vertical-align: bottom;
`
