import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faTimes } from '@fortawesome/free-solid-svg-icons'
import { RoundButton } from '../../General/Buttons'
import { CSSTransition } from 'react-transition-group'

export default function ImagePreview({ file, removeImage }) {

    const [url, setUrl] = useState(null)
    const [hover, setHover] = useState(false)

    const fileReader = new FileReader();
    fileReader.onload = () => {
        const arrayBuffer = fileReader.result
        const blob = new Blob([arrayBuffer], [file.type])
        const blobUrl = URL.createObjectURL(blob)
        setUrl(blobUrl)
    }

    useEffect(() => {
        fileReader.readAsArrayBuffer(file)
    }, [file])

    return (

        <Container onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <PlaceHolder>
                <FontAwesomeIcon icon={faFileImage} />
            </PlaceHolder>
            <Image url={url} >
                <CSSTransition in={hover} timeout={200} unmountOnExit>
                    <XButton type='button' onClick={() => removeImage(file)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </XButton>
                </CSSTransition>
            </Image>
        </Container>

    )
}


const showUp = keyframes`
    from {
        transform: scale(0.2);
    }
}
`

const pulse = keyframes`
    0%{
        filter: opacity(0);
    },
    100% {
        filter:opacity(1);
    }
}

`

const Container = styled.div`
    position:relative;
    
    animation: ${showUp} 0.5s forwards cubic-bezier(0.165, 0.84, 0.44, 1);

`

const PlaceHolder = styled.div`
font-size:5em;
    width:100%;
    height:100%;
    position:absolute;
    z-index:-1;
    left:0;
    top:0;
    display:flex;
    justify-content:center;
    align-items:center;
    color:${props => props.theme.secondaryFontColor};
    animation: ${pulse} 1s infinite alternate;

`

const Image = styled.div`
    object-fit: cover;
    width:100%;
    padding-bottom:100%;
    background-color:transparent;
    background-size:cover;
    background-position:center;
   background-image:url(${props => props.url});
    
`

const XButton = styled(RoundButton)`
    position:absolute;
    top:2%;
    right:2%;
    z-index:3;

    &.enter {
        opacity: 0;
        transform:scale(0.1);
    }
    &.enter-active {
        opacity: 1;
        transform:scale(1);
        transition:transform 200ms, opacity 200ms;
    }
    &.exit {
        opacity: 1;
    }
    &.exit-active {
        opacity: 0;
        transform:scale(0.1);
        transition:transform 200ms, opacity 200ms;
    }
`

