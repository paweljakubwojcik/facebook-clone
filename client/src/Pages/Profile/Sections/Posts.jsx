import React from 'react'
import styled from 'styled-components'
import { MAX_TABLET_PX } from '../../../styles/breakpoints'

import PostsContainer from '../../../Components/Post/PostsContainer'

import contentTypes from '../contentTypes'

import InfoBrief from '../DetailsElements/InfoBrief'
import PicturesBrief from '../DetailsElements/PicturesBrief'
import FriendsBrief from '../DetailsElements/FriendsBrief'
import DetailsElement from '../DetailsElement'
import DoubleStickyContainer from '../DoubleStickyContainer'
import useSizeDetection from '../../../Util/Hooks/useSizeDetection'

import { NAVBAR_HEIGHT } from '../../../Util/Constants/layoutConstants'

export default function Posts({ user }) {
    const { isMobile, isTablet } = useSizeDetection()

    return (
        <Container>
            {!isMobile && !isTablet && (
                <div style={{ width: '100%' }}>
                    <DoubleStickyContainer viewportOffset={NAVBAR_HEIGHT + 64}>
                        <Details>
                            <DetailsElement name={contentTypes.INFO}>
                                <InfoBrief info={user.info} />
                            </DetailsElement>
                            <DetailsElement name={contentTypes.PICTURES}>
                                <PicturesBrief pictures={user.images} />
                            </DetailsElement>
                            <DetailsElement name={contentTypes.FRIENDS}>
                                <FriendsBrief friends={user.friends} />
                            </DetailsElement>
                        </Details>
                    </DoubleStickyContainer>
                </div>
            )}
            <PostsContainer userId={user.id} />
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 4fr 6fr;
    justify-items: center;
    column-gap: 1em;
    width: 100%;

    @media (max-width: ${MAX_TABLET_PX}) {
        grid-template-columns: 1fr;
    }
`
const Details = styled.div`
    & > * {
        width: 100%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
`
