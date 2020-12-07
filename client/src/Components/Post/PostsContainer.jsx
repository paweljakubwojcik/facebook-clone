import React, { useEffect } from 'react'
import styled from 'styled-components'

import PostCard from './PostCard';
import SkeletonPost from '../skeletons/SkeletonPost'
import ErrorMessage from '../General/ErrorMessage'


export default function Posts({ postsData }) {

    const { loading, error, refetch, data: { getPosts: posts } = {} } = postsData
    const isPostsEmpty = posts?.length === 0

    // refetch data on every mount od component to synchronize posts on profile page with posts on home
    // but when adding posts, still using cache to minimalize traffic
    useEffect(() => {
        refetch()
        console.log('refetching')
    }, [refetch])


    return (
        <PostsContainer>
            {loading && [1, 2, 3].map((key) => <SkeletonPost key={key} theme={'dark'} />)}
            {posts && posts.map(post => <PostCard key={post.id} post={post} />)}
            {error && <ErrorMessage>I'm sorry, I failed, couldn't find any posts {';('}</ErrorMessage>}
            {isPostsEmpty && <ErrorMessage>This faker haven't post anything yet {`;(`}</ErrorMessage>}
        </PostsContainer>
    )
}


const PostsContainer = styled.section`
    display:flex;
    width:100%;
    max-width:600px;
    flex-shrink:1;
    flex-direction:column;
    align-items:center;
`

