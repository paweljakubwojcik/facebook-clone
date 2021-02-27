import React from 'react'
import styled from 'styled-components'

import Status from './Status'
import PostsContainer from '../../Components/Post/PostsContainer';
import ContactList from './ContactList';


export default function Home() {

  return (
    <Container>
      <Feed>
        <Status />
        <PostsContainer />
      </Feed>
      <ContactList />
    </Container>
  )
}

const Container = styled.main`
    display:flex;
    width:100%;
   justify-content:center;
`
const Feed = styled.section`
  position:relative;
    display:flex;
    flex-shrink:1;
    flex-direction:column;
    align-items:center;
    width:600px;
`
