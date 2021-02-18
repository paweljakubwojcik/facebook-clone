import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

export default function ScrollContainer({ children }) {

    const [scrollContainerHeight, setScrollHeight] = useState(0)
    const scrollContainer = useRef(null)

    useEffect(() => {
        const height = scrollContainer.current.clientWidth
        setScrollHeight(height)
        return () => {

        }
    }, [scrollContainer])


    return (
        <Container ref={scrollContainer} height={scrollContainerHeight}>
            {children}
        </Container>
    )
}


const Container = styled.div`

    width:100%;
    overflow-y:auto;
    overflow-x:hidden;
    max-height:${props => props.height}px;

`