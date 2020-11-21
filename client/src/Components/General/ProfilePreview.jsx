import React from 'react'
import styled from 'styled-components'
import ElementContainer from './ElementContainer'
import Avatar from './Avatar'



export default function ProfilePreview({ user }) {
    return (
        <ElementContainer >
            <Container >
                <Avatar image={user?.profileImage?.medium} big />
                <div>
                    <h4>{user?.username}</h4>
                    <p>
                        some info about user
                </p>
                </div>
                <LittleBackground image={user?.backgroundImage} />
            </Container>
        </ElementContainer>
    )
}

const LittleBackground = styled.div`
    position:absolute;
    z-index:-1;
    width:100%;
    height:50%;
    top:0;
    left:0;
    background-image: url(${props => props.image});
    background-size:cover;
    background-position:center;
    filter:brightness(.7);
`

const Container = styled.div`
    position:relative;
    z-index:4;
    height:120px;
    width:200px;

    display:grid;
    grid-template-columns:1fr 2fr;
    justify-items:left;
    align-items:center;

    border-radius:inherit;
    overflow:hidden;
    cursor:default;

    .username{
        margin:.3em;
        font-size:1em;
        font-weight:bold;
        min-width:100px;
    }

    p{
        margin:.5em 0;
        padding:0;
        color: ${props => props.theme.secondaryFontColor};
        font-size:.7em;
    }

    

`