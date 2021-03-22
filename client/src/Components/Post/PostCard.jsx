import React from 'react'
import ElementContainer from '../General/ElementContainer'
import PostContent from './PostContent'

export default function PostCard({ post }) {
    return (
        <ElementContainer>
            <PostContent post={post} />
        </ElementContainer>
    )
}
