import React from 'react'
import styled from 'styled-components'

import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

import { PostCardBody, PostCardHeader } from '../Post/PostContent'
import ElementContainer from '../General/ElementContainer'

const SkeletonWrapper = styled.div`
    overflow: hidden;
    position: relative;
    padding: 1em 0.5em;
`
const SkeletonBody = styled(PostCardBody)``
const SkeletonHeader = styled(PostCardHeader)``

function SkeletonPost({ contentOnly }) {
    const Content = () => (
        <SkeletonWrapper className={`skeleton-wrapper`}>
            <SkeletonHeader>
                <SkeletonElement type="avatar"></SkeletonElement>
                <header>
                    <h4>
                        <SkeletonElement type="title" />
                    </h4>
                    <div className="timestamp">
                        <SkeletonElement type="title" />
                    </div>
                </header>
            </SkeletonHeader>
            <SkeletonBody>
                <SkeletonElement type="text"></SkeletonElement>
                <SkeletonElement type="text"></SkeletonElement>
            </SkeletonBody>
            <Shimmer />
        </SkeletonWrapper>
    )

    return !contentOnly ? (
        <ElementContainer noPadding style={{ margin: '1em 0' }}>
            <Content />
        </ElementContainer>
    ) : (
        <Content />
    )
}

export default SkeletonPost
