import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Avatar from '../General/Avatar'

export default function TopPanel({ loading, user, width }) {
    return (
        <Container>
            {user &&
                <>
                    <GradientContainer img={user?.backgroundImage?.urls?.medium} >
                        <BackgroundImage img={user?.backgroundImage?.urls?.large || null} width={width} >

                        <BackgroundLink to={`/images/${user?.backgroundImage?.id}`}> </BackgroundLink>
                        </BackgroundImage>
                    </GradientContainer>
                    <User>
                    <AvatarLink to={`/images/${user?.profileImage?.id}`}>
                            <Avatar image={user?.profileImage?.urls?.large} large />
                        </AvatarLink>
                        <h2>{user?.username}</h2>
                    </User>
                </>}

        </Container >
    )
}



const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:fit-content;
    background-color:${props => props.theme.primaryElementColor};



`

const User = styled.div`
    position:relative;
    h2{
        margin:.7em;
        font-size:1.6em;
    }

`

const GradientContainer = styled.div`
    position:relative;
    overflow:hidden;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:#00000000;
    &::before{
        content:'';
        position:absolute;
        display:block;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:0;
        filter:blur(5em);
        background-image:url(${props => props.img});
    }
    &::after{
        content:'';
        position:absolute;
        display:block;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:0;
       background:linear-gradient(to top, ${props => props.theme.primaryElementColor} 20%,#00000000);
    }
    
`

const AvatarLink = styled(Link)`
        position:absolute;
        bottom:100%;
        left:50%;
        z-index:3;
        transform: translate(-50%, 1.2em);
`

const BackgroundLink = styled(Link)`
    position:absolute;
    z-index:1;
    width:100%;
    height:100%;
`

const BackgroundImage = styled.div`
    display:block;
    position:relative;
    z-index:1;
    background-color:${props => props.theme.secondaryElementColor};
    background-image: url(${props => props.img});
    background-position:center;
    background-size:cover;
    border-radius: 0 0 1em 1em;
    width:100%;
    max-width:${props => props.width}px;
    height:300px;
    min-height:160px;
    box-shadow:${props => props.theme.standardShadow};


    @media (max-width:${props => props.width}px){
        border-radius:0;
        height:30vw;
    }

`