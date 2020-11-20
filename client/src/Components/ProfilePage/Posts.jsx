import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import PostsContainer from '../Post/PostsContainer'

import { GET_POSTS } from '../../Util/GraphQL_Queries'


export default function Posts({ user }) {

    //gets every post written by user
    const postsData = useQuery(GET_POSTS, {
        variables: {
            userId: user.id
        }
    })

    return (
        <Container>
            <Details />
            <PostsContainer postsData={postsData} />
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    width:100%;
`
const Details = styled.div`
    display:flex;
    width:40%;
`