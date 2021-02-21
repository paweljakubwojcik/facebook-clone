import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const max = 9

export default function FriendsBrief({ friends }) {

    return (
        <Container>
            {friends.slice(0, max).map((friend, index) =>
                <Element key={friend.id}>
                    <FriendLink image={friend.profileImage.urls?.medium} as={Link} to={`/profile/${friend.id}`} />
                </Element>
            )}
        </Container>
    )
}

const FriendLink = styled.div`

    display:block;
    width:100%;
    border-radius:50%;
    background-image: url(${props => props.image});
    background-position:center;
    background-size:cover;
    padding-bottom:100%;

`

const Container = styled.div`
    margin: 1em 0;
    display:grid;
    grid-template-columns: repeat(3,minmax(30%,1fr));
    gap:1em;

`

const Element = styled.div`
    position:relative;
`


