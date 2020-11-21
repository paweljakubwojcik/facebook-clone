import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client';


import Status from './Status'
import PostsContainer from '../Post/PostsContainer';
import ContactList from './ContactList';

import { GET_POSTS } from '../../Util/GraphQL_Queries'




export default function Home() {

  // without any variables it gets all posts from DB
  const postsData = useQuery(GET_POSTS);


  return (
    <Container>
      <Feed>
        <Status />
        <PostsContainer postsData={postsData} />
      </Feed>
      <ContactList />
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    width:100%;
   justify-content:center;
`
const Feed = styled.section`
  position:relative;
  z-index:0;
    display:flex;
    flex-shrink:1;
    flex-direction:column;
    align-items:center;
`
