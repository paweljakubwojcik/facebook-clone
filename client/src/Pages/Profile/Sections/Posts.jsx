import React from 'react'
import styled from 'styled-components'
import { MAX_MOBILE_PX } from '../../../styles/breakpoints'

import PostsContainer from '../../../Components/Post/PostsContainer'

import contentTypes from '../contentTypes'

import InfoBrief from '../DetailsElements/InfoBrief'
import PicturesBrief from '../DetailsElements/PicturesBrief'
import FriendsBrief from '../DetailsElements/FriendsBrief'
import DetailsElement from '../DetailsElement'
import useSizeDetection from '../../../Util/Hooks/useSizeDetection'

export default function Posts({ user }) {
    const { isMobile } = useSizeDetection()

    return (
        <Container>
            {!isMobile && (
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
            )}
            <PostsContainer userId={user.id} />
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 60%;
    column-gap: 1em;
    width: 100%;

    @media (max-width: ${MAX_MOBILE_PX}) {
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
`
