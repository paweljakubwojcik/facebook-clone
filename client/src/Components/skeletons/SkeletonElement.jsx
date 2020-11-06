import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import styled from 'styled-components'

export const Skeleton = styled.div`
    background-color: ${props => props.theme.secondaryElementColor};
    margin: .2em 0;
    border-radius: 4px;
    height:.8em;
    filter:opacity(.4);
`


function SkeletonElement({ type }) {
    return (
        <Skeleton className={`skeleton ${type}`}>

        </Skeleton>
    )
}

SkeletonElement.propTypes = {
    type: PropTypes.oneOf(['avatar', 'text', 'title', 'thumbnail'])
}

export default SkeletonElement

