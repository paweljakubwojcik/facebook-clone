import React from 'react'
import styled from 'styled-components';

import defaultUserImage from '../../styles/svg/user-solid.svg'

export default function Avatar({ image, altText, big }) {
    return (
        <ImageContainer big={big ? 1 : 0} className="imageContainer">
            <img src={image} alt={altText} />
        </ImageContainer>
    )
}

Avatar.defaultProps = {
    image: defaultUserImage,
    altText: 'anonimus faker'
};

const ImageContainer = styled.div`
    ${props => props.big ? "height:80px; width:80px;" : "height:40px; width:40px;" }
    

    img{
        border-radius:50%;
        width:auto;
        height:100%;
    }

`