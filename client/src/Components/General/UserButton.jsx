import React, { useState } from 'react'
import styled from 'styled-components'


import Avatar from './Avatar'
import PopUpElement from './PopUpElement'
import UserLink from './ProfilePreview'


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
            <HoverWrapper>
                {!notLink && (
                    <PopUpElement isVisible={isHovered}>
                        <UserLink user={user} />
                    </PopUpElement>
                )}
            </HoverWrapper>
            <Avatar image={user?.profileImage?.medium} />
            <div className="username">
                {user?.username || "User"}
            </div>
        </StyledButton>
    )
}

const HoverWrapper = styled.div`
    position:absolute;
    left:-5px;
`

export const StyledButton = styled.div`


    display:flex;
    justify-content:left;
    align-items:center;

    overflow:visible;

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

    
`