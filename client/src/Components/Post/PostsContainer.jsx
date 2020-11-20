import React from 'react'
import styled from 'styled-components'

import PostCard from './PostCard';
import SkeletonPost from '../skeletons/SkeletonPost'

export default function Posts({ postsData }) {

    const { loading, error, data: { getPosts: posts } = {} } = postsData

    return (
        <PostsContainer>
            {loading && [1, 2].map((key) => <SkeletonPost key={key} theme={'dark'} />)}
            {posts && posts.map(post => <PostCard key={post.id} post={post} />)}
            {error && <ErrorMessage>I'm sorry, I failed, couldn't find any posts {';('}</ErrorMessage>}
        </PostsContainer>
    )
}


const PostsContainer = styled.section`
    display:flex;
    width:600px;
    max-width:600px;
    flex-shrink:1;
    flex-direction:column;
    align-items:center;
`

// TODO: extract this component
const ErrorMessage = styled.p`
    color:#c22c2c;
    font-size:.8em;
`