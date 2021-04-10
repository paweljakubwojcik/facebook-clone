import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { RoundButton } from '../../Components/General/Buttons'
import Image from './Image'
import Post from './Post'
import { maxTablet } from '../../styles/breakpoints'

export default function ImagePage() {
    const history = useHistory()
    const params = useParams()
    const [postId, setPostId] = useState(null)
    const postWidth = 450

    const goBack = () => {
        history.goBack()
    }

    return (
        <>
            <Wrapper>
                <XButton onClick={goBack}>
                    <FontAwesomeIcon icon={faTimes} />
                </XButton>

                <Image setPostId={setPostId} postWidth={postWidth} params={params} />
            </Wrapper>
            {postId && <Post postId={postId} postWidth={postWidth}></Post>}
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
    & > * {
        pointer-events: all;
    }
    @media (max-width: ${maxTablet}) {
        flex-direction: column;
        height: fit-content;
        position: relative;
    }
`

const XButton = styled(RoundButton)`
    position: fixed;
    top: 5px;
    left: 1em;
    z-index: 3;
`
