import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'


import ElementContainer from './ElementContainer'
import Avatar from './Avatar'

const GET_USER_DETAILS = gql`
query getUser(  $userId: ID! ){
 getUser( userId: $userId,) {
    id
    username
    backgroundImage
    profileImage{
        medium
        }
    }
}
`

export default function ProfilePreview({ userId }) {


    const { data: { getUser: { profileImage, username, backgroundImage } = {} } = {} } = useQuery(GET_USER_DETAILS, {
        variables: {
            userId
        }
    })

    return (
        <ElementContainer >
            <Container >
                <Avatar image={profileImage?.medium} big />
                <div className="infoContainer">
                    <h4 className="username">{username}</h4>
                    <p>
                        some info about {username}
                    </p>
                </div>
                <LittleBackground image={backgroundImage} />
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
    //min-width:200px;

    display:grid;
    grid-template-columns:1fr 2fr;
    justify-items:left;
    align-items:center;

    border-radius:inherit;
    overflow:hidden;
    cursor:default;

    .infoContainer{
        width:10em;
    }

    .username{
        margin:.3em;
        font-size:1em;
        font-weight:bold;
        min-width:100px;
        text-align:left;
    }

    p{
        text-align:left;
        margin:.5em 0;
        padding:0;
        color: ${props => props.theme.secondaryFontColor};
        font-size:.7em;
    }

    

`
