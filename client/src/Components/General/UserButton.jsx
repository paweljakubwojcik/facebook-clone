import React, { useState } from 'react'
import styled from 'styled-components'


import Avatar from './Avatar'
import UserLink from './UserLink'


export default function UserButton({ user, notLink, ...rest }) {

    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    return (

        <StyledButton {...rest} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <Avatar altText='not anonymus faker' />
            <div className="username">
                {user?.username || "User"}
            </div>
            <UserLink user={user} isVisible={!notLink && isHovered} />
        </StyledButton>

    )
}

export const StyledButton = styled.div`

    position:relative;

    display:flex;
    justify-content:left;
    align-items:center;

    min-width:10em;

    border-radius:1em;
    padding:5px;

    transition: background-color .3s;

    &:hover{
        background-color:#444648;
        cursor:pointer;
    }

    .username{
        font-size:.8em;
        margin: .5em 1em;
        font-weight:bold;
    }

    //invisible extension for hover
    &::after{
        content:'';
        display:block;
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        width:110%;
        height:110%;
    }
`