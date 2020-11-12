import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function UserLink({ user }) {
    return (

        <StyledLink to='./' className='avatar'>
            <Avatar altText='not anonymus faker' />
            <div className="username">
                {user?.username || "User"}
            </div>
        </StyledLink>

    )
}

const StyledLink = styled(Link)`

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
`