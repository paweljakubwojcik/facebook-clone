import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { RoundButton } from '../../Components/General/Buttons'
import Image from './Image'
import Post from './Post'
import { MAX_TABLET_PX } from '../../styles/breakpoints'

export default function ImagePage() {
    const { goBack } = useHistory()
    const params = useParams()
    const [postId, setPostId] = useState(null)
    const [isFullScreen, setFullscreen] = useState(false)

    const postWidth = 450

    return (
        <>
            <Wrapper isFullScreen={isFullScreen}>
                <XButton onClick={goBack}>
                    <FontAwesomeIcon icon={faTimes} />
                </XButton>

                {/* <Image> sets postId */}
                <Image
                    setPostId={setPostId}
                    postWidth={postWidth}
                    params={params}
                    isFullScreen={isFullScreen}
                    setFullScreen={setFullscreen}
                />
            </Wrapper>
            {postId && !isFullScreen && <Post postId={postId} postWidth={postWidth}></Post>}
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: visible;
    z-index:  ${props => props.isFullScreen ? 3 : 'none'};
    & > * {
        pointer-events: all;
    }
    @media (max-width: ${MAX_TABLET_PX}) {
        ${props => !props.isFullScreen ? 
        `flex-direction: column;
        height: fit-content;
        position: relative;` : ""}
        
    }
`

const XButton = styled(RoundButton)`
    position: fixed;
    top: 5px;
    left: 1em;
    z-index: 3;
`
