import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PopUpElement from '../General/PopUpElement'
import ProfilePreview from '../General/ProfilePreview'


export default function UserLink({ userId, children }) {

    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    return (
        <>
            <StyledLink to={`/profile/${userId}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {children}
                <PopUpElement isVisible={isHovered} showRight>
                    {userId && <ProfilePreview userId={userId} />}
                </PopUpElement>
            </StyledLink>

        </>
    )
}

const StyledLink = styled(Link)`
    position:relative;
    display:inline-block;
    &:hover{
         text-decoration:underline;
         cursor:pointer;
    }
`