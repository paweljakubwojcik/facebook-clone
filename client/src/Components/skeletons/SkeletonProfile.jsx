import React from 'react'
import SkeletonElement from './SkeletonElement'
import Styled from 'styled-components'

const Wrapper = Styled.div`
display: flex;
width:100%;
align-items:center;


`

export default function SkeletonProfile() {
    return (
        <Wrapper >
            <div>
                <SkeletonElement type='avatar' />
            </div>
            <div className='info'>
                <SkeletonElement type='title' />
                <SkeletonElement type='text' />
            </div>
        </Wrapper>
    )
}
