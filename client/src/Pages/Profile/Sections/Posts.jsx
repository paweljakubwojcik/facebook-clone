import React, { useState } from 'react'
import styled from 'styled-components'
import { maxMobile } from '../../../styles/breakpoints'


import PostsContainer from '../../../Components/Post/PostsContainer'

import contentTypes from '../contentTypes'

import InfoBrief from '../DetailsElements/InfoBrief'
import PicturesBrief from '../DetailsElements/PicturesBrief'
import FriendsBrief from '../DetailsElements/FriendsBrief'
import DetailsElement from '../DetailsElement'

export default function Posts({ user }) {
    const match = window.matchMedia(`(max-width:${maxMobile})`)
    match.onchange = (match) => {
        setMobile(match.matches)
    }
    const [isMobileDevice, setMobile] = useState(match.matches)

    return (
        <Container>
            {!isMobileDevice && (
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

    @media (max-width: ${maxMobile}) {
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


