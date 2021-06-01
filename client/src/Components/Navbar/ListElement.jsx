import React from 'react'
import styled from 'styled-components'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const ListElement = ({ isSeen, handleClick, markSeen, children }) => {
    return (
        <div style={{ position: 'relative' }}>
            <ElementContainer isSeen={isSeen} onClick={handleClick}>
                {children}
            </ElementContainer>
            {!isSeen && <NotSeenIndicator onClick={markSeen} />}
        </div>
    )
}

ListElement.ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1em 0 0.6em;
`

export const ElementContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 1em 0.5em;
    color: ${(props) => props.theme.primaryFontColor};
    filter: contrast(${(props) => (props.isSeen ? '.7' : '1')});
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
    transition: background-color 0.2s;
    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.activeButtonColor};
    }
`

ListElement.Buttons = styled.div`
    font-size: 0.7em;
    display: flex;
`

ListElement.Title = styled.div`
    font-size: 0.9em;
`

ListElement.Body = styled.div`
    font-size: 0.7em;
`

ListElement.Timestamp = ({ children, isSeen }) => {
    return <Timestamp isSeen={isSeen}>{dayjs(children).fromNow()}</Timestamp>
}

const Timestamp = styled.p`
    font-size: 0.5em;
    color: ${(props) => (props.isSeen ? props.theme.secondaryFontColor : props.theme.primaryColor)};
`
const NotSeenIndicator = styled.div`
    position: absolute;
    right: 0.5em;
    top: 50%;
    display: block;
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.primaryColor};
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &:hover,
    &:focus {
        cursor: pointer;
        transform: translateY(-50%) scale(1.3);
    }
`

export default ListElement
