import React from 'react'
import styled, { keyframes } from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

export default function ImageLoader({ children }) {
    return (
        <Loader>
            <FontAwesomeIcon icon={faFileImage} style={{ fontSize: '5em' }} />
            <p>{children}</p>
        </Loader>
    )
}


const pulse = keyframes`
    0%{
        filter:grayscale(1);
    },
    70% {
         filter:grayscale(0);
    },
    100% {
         filter:grayscale(0);
    }
}

`

const Loader = styled.div`
    width:100%;
    height:100%;
    position:absolute;
    z-index:-1;
    left:0;
    top:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:${props => props.theme.primaryColor};
    animation: ${pulse} 2s infinite alternate;
    p {
        margin:.5em;
        font-size:inherit;
    }
`