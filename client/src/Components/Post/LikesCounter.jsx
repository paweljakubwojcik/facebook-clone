import React, { useState, useMemo } from 'react'
import styled from 'styled-components'

import PopUpElement from '../General/PopUpElement'
import PopUpList from './PopUpList'

import icons from '../../Util/Constants/reactionsIcons'

// TODO: ograniczyć wyświetlanie gdy likeów jest bardzo dużo

export default function LikesCounter({ reactionsCount, reactions, ...rest }) {
    const areThereAnyLikes = reactionsCount !== 0

    const sortedReactions = useMemo(() => {
        const sortedReactions = {}
        Object.keys(icons).forEach((iconKey) => {
            const oneType = reactions.filter((reaction) => reaction.type === iconKey)
            if (oneType.length !== 0) sortedReactions[iconKey] = oneType
        })
        return sortedReactions
    }, [reactions])

    return (
        <Container {...rest}>
            {Object.entries(sortedReactions).map(([key, value]) => (
                <Counter
                    areThereAnyLikes={areThereAnyLikes}
                    key={key}
                    reactions={value}
                    title={key}
                >
                    <Icon as={icons[key]} />
                </Counter>
            ))}
            {areThereAnyLikes && (
                <Counter
                    areThereAnyLikes={areThereAnyLikes}
                    reactions={reactions}
                    style={{
                        marginLeft: '.7em',
                        fontSize: '1em',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    {reactionsCount}
                </Counter>
            )}
        </Container>
    )
}

const Counter = ({ areThereAnyLikes, reactions, icon, title, children, ...rest }) => {
    const [isHovered, setHover] = useState(false)

    const handleMouseEnter = () => {
        setHover(true)
    }
    const handleMouseLeave = () => {
        setHover(false)
    }
    const isVisible = isHovered && areThereAnyLikes

    return (
        <CounterLikes
            {...rest}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            blue={areThereAnyLikes}
        >
            {children}
            <PopUpElement isVisible={isVisible} showUnder noExtension>
                <PopUpList list={reactions} title={title}></PopUpList>
            </PopUpElement>
        </CounterLikes>
    )
}

const Container = styled.div`
    margin-right: auto;
    display: flex;
    align-items: center;
    font-size: 1em;
    padding: 0.3em;
`

const Icon = styled.div`
    width: 100%;
    height: 100%;
`

const CounterLikes = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.2em;
    height: 1.2em;

    font-size: 1.5em;
    margin: 0.3em -0.3em 0.3em 0;
    padding: 0.2em;
    border-radius: 50%;
    background-color: ${(props) => props.theme.roundButtonColor};
    box-shadow: ${(props) => props.theme.smallShadow};

    color: ${(props) => (props.blue ? props.theme.primaryColor : 'inherit')};

    &:hover {
        ${(props) =>
            props.blue
                ? `cursor:pointer;
            text-decoration:underline;`
                : ''};
    }
`
