import React, { useState, useRef } from 'react'
import styled from 'styled-components'


import Avatar from './Avatar'
import PopUpElement from './PopUpElement'
import ProfilePreview from './ProfilePreview'


export default function UserButton({ user, notLink, onClick, ...rest }) {

    const button = useRef(null)
    const [isHovered, setHover] = useState(false)
    const [popUpPosition, setPopUpPosition] = useState(0)

    const handleMouseEnter = (e) => {
        setHover(true)
        //make sure it takes right element for computing offset
        if (button.current) {
            const elementPosition = button.current.offsetTop
            const elementHeight = button.current.clientHeight
            const elementScrollOffset = button.current.offsetParent.children[0].scrollTop
            //computing popUpElement position
            setPopUpPosition(elementPosition - elementScrollOffset + elementHeight / 2)
        }

    }
    const handleMouseLeave = () => {
        setHover(false)
    }
    const handleOnClick = () => {
        if (onClick)
            onClick()
        button.current.blur()
    }

    return (
        <StyledButton {...rest} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick} ref={button}>
            <HoverWrapper top={popUpPosition}>
                {!notLink && (
                    <PopUpElement isVisible={isHovered}>
                        <ProfilePreview userId={user.id} />
                    </PopUpElement>
                )}
            </HoverWrapper>
            <Avatar image={user?.profileImage?.urls?.small} />
            <div className="username">
                {user?.username || "User"}
            </div>
        </StyledButton>
    )
}

/**
 * this element is only for <PopUpElement /> positioning
 * It is positioned on hover event
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

    background-color:transparent;
    color:inherit;
    font-size:inherit;
    font-family:inherit;

    overflow:visible;

    min-width:10em;

    border-radius:1em;
    padding:5px;

    transition: background-color .3s;

    &:hover,
    &:focus{
        background-color:${props => props.theme.secondaryElementHover};
        cursor:pointer;
    }

    .username{
        font-size:.8em;
        margin: .5em 1em;
        font-weight:bold;
    }

    
`