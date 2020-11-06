import React from 'react'
import styled from 'styled-components'

import Status from '../Components/Status'


const Feed = styled.section`
    display:flex;
    width:100%;
    flex-direction:column;
    align-items:center;
    height:1400px;
`

export default function Home() {
    return (
        <Feed>
            <Status />
        </Feed>
    )
}
