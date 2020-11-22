import React, { useState } from 'react'
import styled from 'styled-components'


import Avatar from './Avatar'
import PopUpElement from './PopUpElement'
import ProfilePreview from './ProfilePreview'


export default function UserButton({ user, notLink, ...rest }) {

    const [isHovered, setHover] = useState(false)
    const [popUpPosition, setPopUpPosition] = useState(0)

    const handleMouseEnter = (e) => {
        setHover(true)
        const elementPosition = e.target.offsetTop
        const elementHeight = e.target.clientHeight
        const elementScrollOffset = e.target.offsetParent.children[0].scrollTop
        setPopUpPosition(elementPosition - elementScrollOffset + elementHeight / 2)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    return (
        <StyledButton {...rest} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <HoverWrapper top={popUpPosition}>
                {!notLink && (
                    <PopUpElement isVisible={isHovered}>
                        <ProfilePreview userId={user.id} />
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

/**
 * this element is only for <PopUpElement /> positioning
 * Notice when absolute postioned elements dont have specified properties like top or left
 * they are positioned static, but overflow the hierarchy
 */
const HoverWrapper = styled.div`
    position:absolute;
    left:-5px;
    top:${props => props.top}px;
`

/**
 * it must be positioned static
 */
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