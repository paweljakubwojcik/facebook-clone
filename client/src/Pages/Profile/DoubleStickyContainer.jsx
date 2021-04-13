import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'

export default function DoubleStickyContainer({ children, viewportOffset = 0 }) {
    const [direction, setDirection] = useState('up')
    const [fillHeight, setFillHeight] = useState(0)
    const [style, setStyle] = useState({})
    const wrapper = useRef(null)

    const prevScroll = useRef(window.scrollY)
    const currentScroll = useRef(0)

    const handleScroll = useCallback(() => {
        currentScroll.current = window.scrollY
        if (prevScroll.current > currentScroll.current) {
            // scroll w góre
            setDirection('up')
        }

        if (prevScroll.current < currentScroll.current) {
            // scroll w dów
            setDirection('down')
        }

        prevScroll.current = window.scrollY
    }, [])

    useEffect(() => {
        if (wrapper.current) {
            const height = wrapper.current.offsetTop - wrapper.current.parentElement.offsetTop
            setFillHeight(height > 0 ? height : 0)
            setStyle(
                direction === 'down'
                    ? {
                          top: window.innerHeight - wrapper.current?.clientHeight,
                      }
                    : {
                          bottom:
                              window.innerHeight - wrapper.current?.clientHeight - viewportOffset,
                      }
            )
        }
    }, [direction, viewportOffset, wrapper])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    return (
        <>
            <div style={{ height: fillHeight }}></div>
            <ScrollWrapper ref={wrapper} style={style} viewportOffset={viewportOffset}>
                {children}
            </ScrollWrapper>
        </>
    )
}

const ScrollWrapper = styled.div`
    width: 100%;
    height: fit-content;
    min-height: calc(100vh - ${(props) => props.viewportOffset}px);
    position: sticky;
`
