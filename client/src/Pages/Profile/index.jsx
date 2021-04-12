import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_USER } from '../../Util/GraphQL_Queries'

import ProfileMenu from './ProfileMenu'
import Posts from './Sections/Posts'
import Info from './Sections/Info'
import TopPanel from './TopPanel'
import Pictures from './Sections/Pictures'
import NotFound from '../../Components/General/NotFound'
import DotLoader from '../../Components/General/DotLoader'

import contentTypes from './contentTypes'
import { UserMatchContext } from './userMatchContext'
import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'
import { MAX_MOBILE_PX } from '../../styles/breakpoints'

const width = 1000

export default function Profile() {
    const context = useCurrentUser()

    const params = useParams()
    const id = params.id.replace('-', ' ')

    const { hash } = useLocation()

    const isViewerTheOwner = context.user?.id === id || context.user?.username === id

    const { data: { user } = {}, loading, error } = useQuery(GET_USER, {
        variables: { userId: id },
        onCompleted: (data) => {
            //console.log(data)
        },
        onError: (e) => {
            console.log(e)
        },
    })

    const [contentType, setContentType] = useState(contentTypes.POSTS)

    useEffect(() => {
        setContentType(contentTypes[hash.replace('#', '').toUpperCase()] || contentTypes.POSTS)
    }, [hash])

    useEffect(() => {
        const isMobileDevice = window.matchMedia(`(max-width:${MAX_MOBILE_PX})`).matches
        //scrolling to the right position after page has load aka user data has been loaded
        if (user && !isMobileDevice) {
            window.scrollTo({
                top: 120,
                behavior: 'smooth',
            })
        }
    }, [user])

    return (
        <UserMatchContext.Provider value={isViewerTheOwner}>
            {user && (
                <>
                    <TopPanel user={user} width={width} />
                    <ProfileMenu width={width} contentType={contentType} user={user}></ProfileMenu>
                    <Content>
                        {contentType === contentTypes.POSTS && <Posts user={user} />}
                        {contentType === contentTypes.INFO && <Info info={user.info} />}
                        {contentType === contentTypes.PICTURES && <Pictures images={user.images} />}
                        {contentType === contentTypes.FRIENDS && <h2>{'FRIENDS'}</h2>}
                    </Content>
                </>
            )}
            {error && <NotFound message={'Faker not found'} />}
            {loading && (
                <Content>
                    <DotLoader pulse />
                </Content>
            )}
        </UserMatchContext.Provider>
    )
}

const Content = styled.div`
    display: flex;
    justify-content: center;
    & > * {
        max-width: 1000px;
    }
`
