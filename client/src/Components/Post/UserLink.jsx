import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PopUpElement from '../General/PopUpElement'
import ProfilePreview from '../General/ProfilePreview'


export default function UserLink({ userId, children, showRight = true, ...rest }) {

    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    return (
        <Container onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rest}>
            <StyledLink to={`/profile/${userId}`}
            >
                {children}

            </StyledLink>
            <PopUpElement isVisible={isHovered} showRight={showRight}>
                {userId && <ProfilePreview userId={userId} />}
            </PopUpElement>
        </Container>
    )
}

const Container = styled.div`
    display:inline-block;
    position:relative;
`

const StyledLink = styled(Link)`
    
    display:inline-block;
    &:hover,
    &:focus{
         text-decoration:underline;
         cursor:pointer;
    }
`