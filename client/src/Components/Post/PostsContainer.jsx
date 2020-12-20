import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client';

import PostCard from './PostCard';
import SkeletonPost from '../skeletons/SkeletonPost'
import ErrorMessage from '../General/ErrorMessage'
import { GET_POSTS } from '../../Util/GraphQL_Queries'
import { useIntersectionObserver } from '../../Util/Hooks/useIntersectionObserver';

export default function Posts({ userId }) {

    const [setRef, visible] = useIntersectionObserver({
        threshold: .7
    })

    // without any variables it gets all posts from DB
    const { loading, error, data: { getPosts: posts } = {}, fetchMore } = useQuery(GET_POSTS, {
        variables: {
            userId,
            offset: 0,
            limit: 3
        },
        notifyOnNetworkStatusChange: true
    });
    const isPostsEmpty = posts?.length === 0

    function handleIntersect() {
        fetchMore({
            variables: {
                offset: posts?.length || 0
            }
        })
    }

    useEffect(() => {
        if (visible)
            handleIntersect()
    }, [visible])


    return (
        <PostsContainer>
            {posts && posts.map(post => <PostCard key={post.id} post={post} />)}
            {loading && [1, 2].map((key) => <SkeletonPost key={key} theme={'dark'} />)}
            {error && <ErrorMessage>I'm sorry, I failed, couldn't find any posts {';('}</ErrorMessage>}
            {isPostsEmpty && <ErrorMessage>This faker haven't post anything yet {`;(`}</ErrorMessage>}
            {!loading && !error && <Dummy ref={setRef}> {[1, 2].map((key) => <SkeletonPost key={key} theme={'dark'} />)}</Dummy>}
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

const Dummy = styled.div`

    display:flex;
    flex-direction:column;
    width:100%;
    background-color:transparent;

`

