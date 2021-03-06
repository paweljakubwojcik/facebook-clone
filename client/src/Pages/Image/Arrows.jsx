import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { RoundButton } from '../../Components/General/Buttons'

export default function Arrows({ currentImage, allImages }) {
    if (!allImages) return null

    const currentIndex = allImages.indexOf(currentImage)
    const nextImage = allImages[currentIndex + 1]
    const prevImage = allImages[currentIndex - 1]

    return (
        <>
            {prevImage && (
                <ButtonLeft>
                    <RoundButton as={Link} to={`${prevImage}`} replace={true}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </RoundButton>
                </ButtonLeft>
            )}
            {nextImage && (
                <ButtonRight>
                    <RoundButton as={Link} to={`${nextImage}`} replace={true}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </RoundButton>
                </ButtonRight>
            )}
            <Counter>
                {currentIndex + 1} / {allImages.length}
            </Counter>
        </>
    )
}

const ButtonLeft = styled.div`
    position: absolute;
    z-index: 3;
    transform: translateY(-50%);
    top: 50%;
    left: 1em;
`

const ButtonRight = styled.div`
    position: absolute;
    z-index: 3;
    transform: translateY(-50%);
    top: 50%;
    right: 1em;
`
const Counter = styled.p`
    position: absolute;
    z-index: 3;
    bottom: 1em;
    left: 1em;
`
