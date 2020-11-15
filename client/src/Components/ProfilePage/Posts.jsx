import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import PostCard from '../HomePage/PostCard'
import SkeletonPost from '../skeletons/SkeletonPost'

const GET_USER_POSTS = gql`
    query getPosts($userId:ID){
        getPosts(userId:$userId){
            body
            commentsCount
            id
            createdAt
            likesCount
            username
            user
            comments {
                body
                username
                createdAt
                id
            }
            likes {
                username
            }
        }
    }
`


export default function Posts({ user }) {

    const { loading, data: { getPosts: posts } = {} } = useQuery(GET_USER_POSTS, {
        variables: {
            userId: user.id
        }
    })

    return (
        <Container>
            <Details />
            <PostFeed>
                {loading && [1, 2].map((key) => <SkeletonPost key={key} theme={'dark'} />)}
                {posts && posts.map(post => <PostCard key={post.id} post={post} />)}
            </PostFeed>

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

const PostFeed = styled.div`
    width:60%;
`