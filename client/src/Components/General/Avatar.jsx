import React, { forwardRef } from 'react'
import styled from 'styled-components';

import defaultUserImage from '../../styles/svg/user-solid.svg'



const Avatar = forwardRef(({ image, altText, big, large, ...rest }, ref) => {

    return (
        <ImageContainer big={big} large={large} img={image || defaultUserImage} className="avatar" ref={ref} {...rest} />
    )
})

export default Avatar

Avatar.defaultProps = {
    image: defaultUserImage,
    altText: 'anonimus faker'
};

const ImageContainer = styled.div`
    flex-shrink:0;
    box-sizing:content-box;
    height:40px;
    width:40px;
    ${props => props.big && "height:80px; width:80px;"}
    ${props => props.large && "height:12em; width:12em;"}
    background-image: url(${props => props.img});
    background-position:center;
    background-size:cover;
    border-radius:50%;
    border: solid 7px ${props => props.large || props.big ? props.theme.primaryElementColor : 'none'}; 
    
`