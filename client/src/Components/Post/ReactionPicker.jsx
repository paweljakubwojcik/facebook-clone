import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import ElementContainer from '../General/ElementContainer'

import { ReactComponent as Angry } from '../../styles/svg/reactions/angry.svg'
import { ReactComponent as Happy } from '../../styles/svg/reactions/happy.svg'
import { ReactComponent as Love } from '../../styles/svg/reactions/in-love.svg'
import { ReactComponent as Haha } from '../../styles/svg/reactions/laugh.svg'
import { ReactComponent as Wow } from '../../styles/svg/reactions/surprised.svg'
import { ReactComponent as Sad } from '../../styles/svg/reactions/worried.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const icons = { Love, Happy, Haha, Wow, Angry, Sad }
export default function ReactionPicker({ visible }) {
    return (
        <AnotherContainer noMargins>
            <IconsContainer>
                <Button delay={0}>
                    <FontAwesomeIcon
                        style={{ width: '1em', height: '1em' }}
                        icon={faThumbsUp}
                        className="Like"
                    />
                </Button>
                {Object.entries(icons).map(([key, Icon], i) => (
                    <Button key={key} delay={i * 50 + 100}>
                        <Icon style={{ width: '1em', height: '1em' }} className={`${key}`} />
                    </Button>
                ))}
            </IconsContainer>
            <ReallySmallAttribute>
                Icons made by
                <a href="https://www.freepik.com" title="Freepik">
                    Freepik
                </a>
                from
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </ReallySmallAttribute>
        </AnotherContainer>
    )
}

ReactionPicker.Container = styled.div`
    position: relative;
`

const AnotherContainer = styled(ElementContainer)`
    border-radius: 10000px;
    width: 100%;
    min-width: 320px;
`

const ReallySmallAttribute = styled.div`
    font-size: 0.5em;
    opacity: 0.8;
    position: absolute;
    width: 100%;
`

const IconsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`

const LikeAnimation = keyframes`
    0% {
        transform: translateY(0%);
    }
    30%{
         transform: translateY(-40%) rotate(4deg) scale(1.1);
    }
    35%{
         transform: translateY(-40%) rotate(15deg) scale(1.1);
    }
    40%{
        transform: translateY(-40%) rotate(-15deg) scale(1.1);
    }
    45%{
        transform: translateY(-40%) rotate(10deg) scale(1.1);
    }
    60%{
        transform: translateY(-40%) rotate(10deg) scale(1.1);
    }
    80% {
      transform:translateY(0%);
    }
    100% {
      transform:translateY(0%);
    }

`

//TODO: animations, gsap will be probably best for this
const LoveAnimation = keyframes`
    0% {
        .eye{
            top:0;
        }
    }
    100% {
       .eye{
             top:-100px;
        }
    }

`

const Animation = keyframes`
    0% {
        transform: translateY(0%);
    }
    20% {
        transform: translateY(0%);
    }
    30%{
         transform: rotate(4deg) scale(1.3);
    }
    35%{
         transform:  rotate(15deg) scale(1.3);
    }
    40%{
        transform:  rotate(-15deg) scale(1.3);
    }
    45%{
        transform:  rotate(10deg) scale(1.3);
    }
    60%{
        transform:  rotate(10deg) scale(1.3);
    }
    70% { 
         transform:  scale(1);
    }
    80% { 
         transform:  rotate(0deg);
    }
    100% {
     transform:  rotate(360deg);
    }

`

const Stagger = keyframes`
    0% {
        opacity:0;
        transform: translateY(100%);
    }
    100% {
        opacity:1;
       transform: translateY(0%);
    }
`

const Button = styled.button`
    background-color: transparent;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0.1em;

    height: 2rem;
    width: 2rem;

    font-size: 2rem;
    color: ${(props) => props.theme.primaryColor};
    opacity: 0;
    animation: ${Stagger} 0.2s ${(props) => props.delay + 200}ms forwards;

    &:hover {
        cursor: pointer;
        & > * {
            animation: ${Animation} 3s infinite cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .Like {
            animation: ${LikeAnimation} 3s infinite;
        }
        .Love {
            animation: ${LoveAnimation} 3s infinite;
        }
    }

    & > * {
        transition: transform 0.1s;
        filter: drop-shadow(0 0.4em 0.4em #00000022);
    }
`
