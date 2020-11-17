import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { GET_USER } from '../Util/GraphQL_Queries'

import contentTypes from '../Components/ProfilePage/contentTypes'

import ProfileMenu from '../Components/ProfilePage/ProfileMenu';
import Posts from '../Components/ProfilePage/Posts';
import TopPanel from '../Components/ProfilePage/TopPanel';

const width = 1000

export default function Profile() {

    const { id } = useParams();

    const { loading, data: { getUser: user } = {} } = useQuery(GET_USER, {
        variables: { userId: id },
    })

    const [contentType, setContentType] = useState('posts')

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 150,
                behavior: "smooth",
            })
        }, 100)

    }, [])


    return (
        <>
            <TopPanel user={user} width={width} />
            <ProfileMenu width={width} contentType={contentType} setContentType={setContentType} user={user} ></ProfileMenu>
            <Content>
                {contentType === contentTypes.POSTS && user && <Posts user={user} />}
            </Content>
        </>
    )
}





const Content = styled.div`
    display:flex;
    justify-content:center;
    & > * {
        max-width:1000px;
    }
`

