import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'

import { GET_USER } from '../Util/GraphQL_Queries'
import contentTypes from '../Components/ProfilePage/contentTypes'

import Avatar from '../Components/General/Avatar'
import ProfileMenu from '../Components/ProfilePage/ProfileMenu';
import Posts from '../Components/ProfilePage/Posts';

const width = 1000

export default function Profile() {

    const { id } = useParams();

    const [contentType, setContentType] = useState('posts')

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 150,
                behavior: "smooth",
            })
        }, 100)

    }, [])


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
            <ProfileMenu width={width} contentType={contentType} setContentType={setContentType} user={user} ></ProfileMenu>
            <Content>
                {contentType === contentTypes.POSTS && user && <Posts user={user} />}
            </Content>
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
    display:block;
    position:relative;
    & > .avatar {
        position:absolute;
        bottom:0;
        left:50%;
    }
    background-color:${props => props.theme.secondaryElementColor};
    background-image: url(${props => props.img});
    background-position:center;
    background-size:cover;
    border-radius: 0 0 1em 1em;
    width:100%;
    max-width:${width}px;
    height:300px;

    .avatar{
        transform: translate(-50%, 1.5em);
    }

    @media (max-width:${width}px){
        border-radius:0;
        height:30vw;
    }

`

const Content = styled.div`
    height:1000px;
    display:flex;
    justify-content:center;
    & > * {
        max-width:1000px;
    }
`

