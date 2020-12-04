import React, { useContext, useState, useEffect, createContext } from 'react'
import styled from 'styled-components'

import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'

import { GET_USER } from '../../Util/GraphQL_Queries'
import { AuthContext } from '../../Context/auth'
import contentTypes from './contentTypes'

import ProfileMenu from './ProfileMenu';
import Posts from './Posts';
import TopPanel from './TopPanel';

const width = 1000

export const UserMatchContext = createContext(false)

export default function Profile() {
    const context = useContext(AuthContext)

    const { id } = useParams();

    const isViewerTheOwner = context.user.id === id

    const { data: { getUser: user } = {} } = useQuery(GET_USER, {
        variables: { userId: id },
    })


    const [contentType, setContentType] = useState('posts')


    useEffect(() => {
        //scrolling to the right position after page has load aka user data has been loaded
        if (user) {
            window.scrollTo({
                top: 150,
                behavior: "smooth",
            })
        }

    }, [user])

    return (
        <UserMatchContext.Provider value={isViewerTheOwner}>
            <TopPanel user={user} width={width} />
            <ProfileMenu width={width} contentType={contentType} setContentType={setContentType} user={user}></ProfileMenu>
            <Content>
                {contentType === contentTypes.POSTS && user && <Posts user={user} setContentType={setContentType} />}
                {contentType === contentTypes.INFO && user && <><h2>{'INFO'}</h2><div style={{ height: 1000 }}></div></>}
                {contentType === contentTypes.PICTURES && user && <h2>{'PICTURES'}</h2>}
                {contentType === contentTypes.FRIENDS && user && <h2>{'FRIENDS'}</h2>}
            </Content>
        </UserMatchContext.Provider>
    )
}


const Content = styled.div`
    display:flex;
    justify-content:center;
    & > * {
        max-width:1000px;
    }
`

