import React from 'react'
import styled from 'styled-components'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'
import SkeletonProfile from './SkeletonProfile'


const SkeletonWrapper = styled.div`
    margin: 20px auto;
    padding: 10px 15px;
    border-radius: 4px;
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: ${props => props.theme.primaryElementColor};
`


function SkeletonPost() {
    return (
        <SkeletonWrapper className={`skeleton-wrapper`}>
            <SkeletonProfile></SkeletonProfile>

            <SkeletonElement type='text'></SkeletonElement>
            <SkeletonElement type='text'></SkeletonElement>
            <Shimmer />
        </SkeletonWrapper>
    )
}


export default SkeletonPost

