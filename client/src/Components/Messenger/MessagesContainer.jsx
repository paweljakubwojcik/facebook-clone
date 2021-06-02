import React from 'react'
import styled from 'styled-components'

import dayjs from 'dayjs'

import Message from './Message'

export default function MessagesContainer({ messages, children }) {
    return (
        <Messages>
            {messages &&
                messages.map((message, i) => {
                    const HOUR = 1000 * 60 * 60 // AN hour
                    const WEEK = HOUR * 24 * 7

                    const current = message
                    const prev = i !== 0 && messages[i - 1]
                    const next = i + 1 !== messages.length && messages[i + 1]

                    const timeDiffrence = current.timestamp - next?.timestamp
                    const isTimeDiffrenceEnough = timeDiffrence > HOUR

                    const DATE_FORMATING =
                        Date.now() - current.timestamp > WEEK ? 'D MMM YYYY, HH:mm' : 'dd HH:mm'

                    const isFirst =
                        current.user.id !== prev?.user?.id ||
                        prev?.timestamp - current?.timestamp > HOUR

                    const isLast = current.user.id !== next?.user?.id || isTimeDiffrenceEnough

                    return (
                        <React.Fragment key={message.id}>
                            <Message
                                key={message.id}
                                message={message}
                                first={isFirst}
                                last={isLast}
                            />
                            {isTimeDiffrenceEnough && (
                                <Timestamp key={current.timestamp}>
                                    {dayjs(current.timestamp).format(DATE_FORMATING)}
                                </Timestamp>
                            )}
                        </React.Fragment>
                    )
                })}
            {children}
        </Messages>
    )
}

const Messages = styled.div`
    display: flex;
    flex-direction: column-reverse;
    padding: 0.5em 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;

    ${(props) => props.theme.scrollBar};
`

const Timestamp = styled.div`
    width: 100%;
    text-align: center;
    margin: 1em 0 0.1em 0;

    color: ${(props) => props.theme.secondaryFontColor};
    font-size: 0.7em;
`
