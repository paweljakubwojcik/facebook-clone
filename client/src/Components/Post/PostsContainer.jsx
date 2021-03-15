import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

import PostCard from './PostCard'
import SkeletonPost from '../skeletons/SkeletonPost'
import ErrorMessage from '../General/ErrorMessage'
import NotFound from '../General/NotFound'
import { GET_POSTS } from '../../Util/GraphQL_Queries'
import { useIntersectionObserver } from '../../Util/Hooks/useIntersectionObserver'

export default function Posts({ userId }) {
    const [setRef] = useIntersectionObserver(
        {
            threshold: 0.7,
        },
        handleIntersect
    )

    const [canFetchMore, setCanFetchMore] = useState(true)

    // without any variables it gets all posts from DB
    const { loading, error, data: { posts } = {}, fetchMore, refetch } = useQuery(GET_POSTS, {
        variables: {
            userId,
            limit: 3,
        },
        onCompleted: (data) => {
            console.log(data)
        },
    })
    const isPostsEmpty = posts?.length === 0

    async function handleIntersect() {
        fetchMore({
            variables: {
                cursor: !isPostsEmpty ? posts[posts.length - 1].id : null,
            },
        }).then(({ data: { posts: newPosts } }) => {
            //when all posts have been fetched
            if (newPosts.length === 0) setCanFetchMore(false)
        })
    }

    useEffect(() => {
        refetch()
    }, [])

    console.log(posts)

    return (
        <PostsContainer>
            {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
            {loading && [1, 2].map((key) => <SkeletonPost key={key} theme={'dark'} />)}
            {error && <NotFound message={"Couldn't find any content"} />}
            {isPostsEmpty && (
                <ErrorMessage>This faker haven't post anything yet {`;(`}</ErrorMessage>
            )}
            {!loading && !error && canFetchMore && (
                <Dummy ref={setRef}>
                    {' '}
                    {[1, 2].map((key) => (
                        <SkeletonPost key={key} theme={'dark'} />
                    ))}
                </Dummy>
            )}
        </PostsContainer>
    )
}

const PostsContainer = styled.section`
    display: flex;
    width: 100%;
    max-width: 600px;
    flex-shrink: 1;
    flex-direction: column;
    align-items: center;
`

const Dummy = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: transparent;
`
