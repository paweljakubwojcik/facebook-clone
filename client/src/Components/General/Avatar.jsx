import React from 'react'
import styled from 'styled-components';

import defaultUserImage from '../../styles/svg/user-solid.svg'

export default function Avatar({ image, altText, big, large }) {
    return (
        <ImageContainer big={big} large={large} img={image} className="avatar">
        </ImageContainer>
    )
}

Avatar.defaultProps = {
    image: defaultUserImage,
    altText: 'anonimus faker'
};

const ImageContainer = styled.div`
    box-sizing:content-box;
    height:40px;
    width:40px;
    ${props => props.big && "height:80px; width:80px;"}
    ${props => props.large && "height:120px; width:120px;"}
    background-image: url(${props => props.img});
    background-position:center;
    background-size:cover;
    border-radius:50%;
    border: solid 10px ${props => props.large ? props.theme.primaryElementColor : 'none'}; 

`