import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_USER } from '../../Util/GraphQL_Queries'

import ProfileMenu from './ProfileMenu'
import Posts from './Sections/Posts'
import TopPanel from './TopPanel'
import Pictures from './Sections/Pictures'
import NotFound from '../../Components/General/NotFound'
import DotLoader from '../../Components/General/DotLoader'

import contentTypes from './contentTypes'
import { UserMatchContext } from './userMatchContext'
import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'

const width = 1000

export default function Profile() {
    const context = useCurrentUser()

    const params = useParams()
    const id = params.id.replace('-', ' ')

    const isViewerTheOwner = context.user?.id === id || context.user?.username === id

    const { data: { user } = {}, loading, error } = useQuery(GET_USER, {
        variables: { userId: id },
        onCompleted: (data) => {
            console.log(data)
        },
        onError: (e) => {
            console.log(e)
        },
    })

    const [contentType, setContentType] = useState('posts')

    const isMobileDevice = window.matchMedia('(max-width:600px)').matches

    useEffect(() => {
        //scrolling to the right position after page has load aka user data has been loaded
        if (user && !isMobileDevice) {
            window.scrollTo({
                top: 120,
                behavior: 'smooth',
            })
        }
    }, [user, isMobileDevice])

    console.log(user)

    return (
        <UserMatchContext.Provider value={isViewerTheOwner}>
            {user && (
                <>
                    <TopPanel user={user} width={width} />
                    <ProfileMenu
                        width={width}
                        contentType={contentType}
                        setContentType={setContentType}
                        user={user}
                    ></ProfileMenu>
                    <Content>
                        {contentType === contentTypes.POSTS && (
                            <Posts user={user} setContentType={setContentType} />
                        )}
                        {contentType === contentTypes.INFO && (
                            <>
                                <h2>{'INFO'}</h2>
                                <div style={{ height: 1000 }}></div>
                            </>
                        )}
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
    min-height: 80vh;
    justify-content: center;
    & > * {
        max-width: 1000px;
    }
`
