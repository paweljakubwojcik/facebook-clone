import React from 'react'
import styled from 'styled-components'

import Avatar from '../General/Avatar'

export default function TopPanel({ loading, user, width }) {


    return (
        <Container>
            {user &&
                <BackgroundImage img={user?.backgroundImage || null} width={width} >
                    <a className={'avatar-link'} href={user?.profileImage?.large}>
                        <Avatar image={user?.profileImage?.large} large />
                    </a>
                <a className={'background-link'} href={user?.backgroundImage}> </a>
                </BackgroundImage>}
            <h2>{user?.username}</h2>
        </Container>
    )
}


const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:fit-content;
    background-color:${props => props.theme.primaryElementColor};

    h2{
        margin:.7em;
        font-size:1.6em;
    }
   
`

const BackgroundImage = styled.div`
    display:block;
    position:relative;
    & > .avatar-link {
        position:absolute;
        bottom:0;
        left:50%;
        z-index:3;
        transform: translate(-50%, 1.5em);
    }
    background-color:${props => props.theme.secondaryElementColor};
    background-image: url(${props => props.img});
    background-position:center;
    background-size:cover;
    border-radius: 0 0 1em 1em;
    width:100%;
    max-width:${props => props.width}px;
    height:300px;
    min-height:160px;

    .background-link{
        position:absolute;
        z-index:1;
        width:100%;
        height:100%;
    }


    @media (max-width:${props => props.width}px){
        border-radius:0;
        height:30vw;
    }

`