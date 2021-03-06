import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ShowableButton } from './Buttons'
import ImageLoader from './ImageLoader'
import FileImage from './FileImage'

export default function ImagePreview({ file, removeImage }) {

    return (
        <Container>
            <ImageLoader />
            <FileImage file={file}>
                {(url) => (
                    <Image url={url}>
                        <XButton type="button" onClick={() => removeImage(file)} parent={Container}>
                            <FontAwesomeIcon icon={faTimes} />
                        </XButton>
                    </Image>
                )}
            </FileImage>
        </Container>
    )
}

const showUp = keyframes`
    from {
        transform: scale(0.2);
    }
}
`

const Container = styled.div`
    position: relative;

    animation: ${showUp} 0.5s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
`

const Image = styled.div`
    object-fit: cover;
    width: 100%;
    padding-bottom: 100%;
    background-color: transparent;
    background-size: cover;
    background-position: center;
    background-image: url(${(props) => props.url});
`

const XButton = styled(ShowableButton)`
    position: absolute;
    top: 2%;
    right: 2%;
    z-index: 3;
`
