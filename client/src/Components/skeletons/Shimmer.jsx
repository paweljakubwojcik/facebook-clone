import React from 'react'
import styled, { keyframes } from 'styled-components'

export default function Shimmer() {
    return (
        <ShimmerWrapper className="shimmer-wrapper">
            <div className="shimmer"></div>
        </ShimmerWrapper>
    )
}

const shimmer = keyframes`
    0%{
        transform: translateX(-300%) skewX(-20deg);
    }
    50% {
        transform: translateX(-120%) skewX(-20deg);
    }
    100% {
        transform: translateX(300%) skewX(-20deg);
    }
`

const ShimmerWrapper = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    .shimmer {
        width: 50%;
        height: 100%;
        background-color: #ffffff33;
        box-shadow: 0 0 30px 15px #ffffff11;
        animation: ${shimmer} 2s infinite;
        filter: blur(10px);
    }
`
