import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

import { GET_IMAGE } from '../../Util/GraphQL_Queries'

import Arrows from './Arrows'
import ImageLoader from '../../Components/General/ImageLoader'

import { MAX_TABLET_PX } from '../../styles/breakpoints'
import { RoundButton } from '../../Components/General/Buttons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'

export default function Image({ setPostId, postWidth, params, isFullScreen, setFullScreen }) {
    const { id } = params

    const { loading, error, data: { image } = {} } = useQuery(GET_IMAGE, {
        variables: {
            imageId: id,
        },
    })

    const allImages = image ? image.post.images.map((image) => image.id) : null

    useEffect(() => {
        if (image) {
            if (image.post) setPostId(image.post.id)
            else setFullScreen(true)
        }
    }, [image, setPostId, setFullScreen])

    return (
        <ImageContainer image={image?.urls.small} postWidth={postWidth} fullScreen={isFullScreen}>
            {image && (
                <>
                    <FullScreenButton onClick={() => setFullScreen((prev) => !prev)}>
                        <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
                    </FullScreenButton>
                    <Arrows currentImage={id} allImages={allImages} />
                    <ActualImage image={image} />
                </>
            )}
            {loading && <ImageLoader />}
            {((!image && !loading) || error) && (
                <ImageLoader> Can't find this picture </ImageLoader>
            )}
        </ImageContainer>
    )
}

const ActualImage = ({ image }) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            <Img src={image.urls.large} onLoad={() => setLoaded(true)} loaded={loaded} />
        </>
    )
}

const ImageContainer = styled.div`
    display: flex;
    position: relative;
    z-index: 1;
    top: 0;
    height: 100vh;
    width: calc(100% - ${(props) => (props.fullScreen ? 0 : props.postWidth)}px);

    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    border-right: solid 1px ${(props) => props.theme.borderColor};
    box-shadow: inset -10px 0 20px -5px ${(props) => props.theme.shadowColor};

    @media (max-width: ${MAX_TABLET_PX}) {
        width: 100%;
        height: auto;
        min-height: 50vh;
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(1.1);
        z-index: -1;
        display: block;
        width: 100%;
        height: 100%;
        @supports ((-webkit-backdrop-filter: blur(16px)) or (backdrop-filter: blur(16px))) {
            backdrop-filter: blur(0.5em);
        }
    }

    &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(1.1);
        z-index: -2;
        display: block;
        width: 100%;
        height: 100%;
        background-image: url(${(props) => props.image});
        background-position: center;
        background-size: cover;
        filter: blur(0.5em);
        @supports ((-webkit-backdrop-filter: blur(16px)) or (backdrop-filter: blur(16px))) {
            filter: brightness(0.8);
        }
    }
`

const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
    transition: opacity 0.2s;
    opacity: ${(props) => (props.loaded ? '1' : '0')};

    @media (max-width: ${MAX_TABLET_PX}) {
        max-height: calc(100vh - var(--navbar-height));
    }
`

const FullScreenButton = styled(RoundButton)`
    position: absolute;
    top: 5px;
    right: 1em;
    z-index: 3;
    background-color: transparent;
`
