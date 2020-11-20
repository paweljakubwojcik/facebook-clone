import React, { useState } from 'react'
import styled from 'styled-components';

import defaultUserImage from '../../styles/svg/user-solid.svg'
import UserLink from './UserLink'


export default function Avatar({ image, user, altText, big, large, link }) {

    const img = user?.profileImage?.medium || image

    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    return (
        <>
            <ImageContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} big={big} large={large} img={img || defaultUserImage} className="avatar">
            </ImageContainer>
            {user && <UserLink user={user} isVisible={isHovered} />}
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