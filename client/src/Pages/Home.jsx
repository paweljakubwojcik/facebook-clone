import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client';

import SkeletonPost from '../Components/skeletons/SkeletonPost'
import Status from '../Components/HomePage/Status'
import PostCard from '../Components/HomePage/PostCard';

import { GET_POSTS } from '../Util/GraphQL_Queries'


export default function Home() {


  const { loading, error, data: { getPosts: posts } = {} } = useQuery(GET_POSTS);


  return (
    <Container>
      <Feed>
        <Status />

        {posts && posts.map(post => <PostCard key={post.id} post={post} />)}
        {loading && [1, 2].map((key) => <SkeletonPost key={key} theme={'dark'} />)}

      </Feed>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    width:100%;
   justify-content:center;
`

const Feed = styled.section`
    display:flex;
    width:600px;
    max-width:600px;
    flex-shrink:1;
    flex-direction:column;
    align-items:center;
`