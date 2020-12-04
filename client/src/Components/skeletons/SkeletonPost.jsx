import React from 'react'
import styled from 'styled-components'

import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

import { PostCardBody, PostCardHeader } from '../Post/PostContent'
import ElementContainer from '../General/ElementContainer'


const SkeletonWrapper = styled.div`
    overflow: hidden;
    position:relative;
`
const SkeletonBody = styled(PostCardBody)`

`
const SkeletonHeader = styled(PostCardHeader)`

`

function SkeletonPost() {
    return (
        <ElementContainer>
            <SkeletonWrapper className={`skeleton-wrapper`}>

                <SkeletonHeader>
                    <SkeletonElement type='avatar'></SkeletonElement>
                    <header>
                        <h4>
                            <SkeletonElement type='title' />
                        </h4>
                        <div className='timestamp'>
                            <SkeletonElement type='title' />
                        </div>
                    </header>
                </SkeletonHeader>
                <SkeletonBody>
                    <SkeletonElement type='text'></SkeletonElement>
                    <SkeletonElement type='text'></SkeletonElement>
                </SkeletonBody>
                <Shimmer />

            </SkeletonWrapper>
        </ElementContainer>
    )
}


export default SkeletonPost

