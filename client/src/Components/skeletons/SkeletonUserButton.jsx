import React from 'react'

import styled from 'styled-components'

import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

import { StyledButton } from '../General/UserButton'


const SkeletonWrapper = styled(StyledButton)`
    overflow: hidden;
    position:relative;
`


export default function SkeletonUserButton() {
    return (
        <SkeletonWrapper className={`skeleton-wrapper`}>

            <SkeletonElement type='avatar'></SkeletonElement>

            <SkeletonElement type='title' />

            <Shimmer />
        </SkeletonWrapper>
    )
}
