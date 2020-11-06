import React from 'react'
import styled from 'styled-components'
import SkeletonPost from '../Components/skeletons/SkeletonPost'

import Status from '../Components/Status'


const Container = styled.div`
    display:flex;
    width:100%;
   justify-content:center;
`

const Feed = styled.section`
    display:flex;
    width:600px;
    max-width:600px;
    flex-shrink:1;
    flex-direction:column;
    align-items:center;
`

export default function Home() {
    return (
        <Container>
            <Feed>
                <Status />


                {[1, 2, 3, 4].map(() => <SkeletonPost theme={'dark'} />)}




            </Feed>
        </Container>
    )
}
