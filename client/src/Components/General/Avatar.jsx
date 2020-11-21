import React from 'react'
import styled from 'styled-components';

import defaultUserImage from '../../styles/svg/user-solid.svg'



export default function Avatar({ image, altText, big, large, link }) {

    return (
        <>
            <ImageContainer big={big} large={large} img={image || defaultUserImage} className="avatar">
            </ImageContainer>
        </>
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
    ${props => props.large && "height:12em; width:12em;"}
    background-image: url(${props => props.img});
    background-position:center;
    background-size:cover;
    border-radius:50%;
    border: solid 5px ${props => props.large ? props.theme.primaryElementColor : 'none'}; 

`