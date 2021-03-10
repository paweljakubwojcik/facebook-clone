import React from 'react'
import styled from 'styled-components/macro'
import ElementContainer from '../General/ElementContainer'

import { ReactComponent as Angry } from '../../styles/svg/reactions/angry.svg'
import { ReactComponent as Happy } from '../../styles/svg/reactions/happy.svg'
import { ReactComponent as Love } from '../../styles/svg/reactions/in-love.svg'
import { ReactComponent as Haha } from '../../styles/svg/reactions/laugh.svg'
import { ReactComponent as Wow } from '../../styles/svg/reactions/surprised.svg'
import { ReactComponent as Sad } from '../../styles/svg/reactions/worried.svg'

const icons = { Angry, Happy, Love, Haha, Wow, Sad }

export default function ReactionPicker() {
    return (
        <AnotherContainer noMargins>
            <IconsContainer>
                {Object.entries(icons).map(([key, Icon]) => (
                    <Button key={key}>
                        <Icon style={{ width: '100%', height: '100%' }} />
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
    transform: translateY(-100%);
    border-radius: 10000px;
    width: 100%;
    min-width: 320px;
    position: absolute;
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
    & > * {
        height: 40px;
        width: 40px;
    }
`

const Button = styled.button`
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    transition: transform 0.1s;
    &:hover {
        transform: scale(1.2) translateY(-10%);
    }
`
