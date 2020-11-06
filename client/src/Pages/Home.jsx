import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client';

import SkeletonPost from '../Components/skeletons/SkeletonPost'
import Status from '../Components/Status'

const QUERY_POSTS = gql`
   {
  getPosts {
    body
    commentsCount
    id
    createdAt
    likesCount
    username
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


export default function Home() {


    const { loading, error, data } = useQuery(QUERY_POSTS);


    return (
        <Container>
            <Feed>
                <Status />

                {data && data.getPosts.map(post => <SkeletonPost key={post.id} theme={'dark'} />)}
                {loading && [1, 2, 3, 4].map((key) => <SkeletonPost key={key} theme={'dark'} />)}

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