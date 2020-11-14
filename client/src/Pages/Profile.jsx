import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'

import { GET_USER } from '../Util/GraphQL_Queries'

import Avatar from '../Components/General/Avatar'
import ProfileMenu from '../Components/ProfilePage/ProfileMenu';

const width = 1000

export default function Profile() {


    const { id } = useParams();

    const [contentType, setContentType] = useState('posts')


    const { loading, data: { getUser: user } = {} } = useQuery(GET_USER, {
        variables: { userId: id },
    })


    return (
        <>
            <TopPanel>
                {!loading && <BackgroundImage img={user?.backgroundImage || null}>
                    <Avatar large />
                </BackgroundImage>}
                <h2>{user?.username}</h2>
            </TopPanel>
            <ProfileMenu width={width} contentType={contentType} setContentType={setContentType}></ProfileMenu>
            <Content></Content>
        </>
    )
}

const TopPanel = styled.div`
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
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:end;
    flex-shrink:0;
    background-color:${props => props.theme.secondaryElementColor};
    background-image: url(${props => props.img});
    background-position:center;
    background-size:cover;
    border-radius: 0 0 1em 1em;
    width:100%;
    max-width:${width}px;
    height:300px;

    .avatar{
        transform: translate(0, 1em);
    }

    @media (max-width:${width}px){
        border-radius:0;
        height:30vw;
    }

`

const Content = styled.div`
    height:1000px;
`

