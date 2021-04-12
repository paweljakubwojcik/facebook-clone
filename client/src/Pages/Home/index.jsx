import React from 'react'
import styled from 'styled-components'

import Status from './Status'
import PostsContainer from '../../Components/Post/PostsContainer'
import ContactList from './ContactList'
import useSizeDetection from '../../Util/Hooks/useSizeDetection'
import { MAX_TABLET_PX } from '../../styles/breakpoints'

export default function Home() {
    const { isTablet, isMobile } = useSizeDetection()

    return (
        <Container>
            <Feed>
                <Status />
                <PostsContainer />
            </Feed>
            {!isTablet && !isMobile && <ContactList />}
        </Container>
    )
}

const Container = styled.main`
    display: grid;
    width: 100%;
    justify-items: center;

    grid-template-areas: 'left feed right';
    grid-template-columns: 1fr 4fr 1fr;

    /* @media (max-width: ${1200}px) {
        grid-template-areas: 'feed feed right';
        grid-template-columns: repeat(3, 1fr);
    } */
`
const Feed = styled.section`
    position: relative;
    display: flex;
    flex-shrink: 1;
    flex-direction: column;
    align-items: center;
    width: 600px;
    grid-area: feed;
`
