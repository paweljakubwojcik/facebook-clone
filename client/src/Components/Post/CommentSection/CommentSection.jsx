import React, { useContext } from 'react'
import styled from 'styled-components'

import { AuthContext } from '../../../Context/auth'

import Comment from './Comment'
import CommentForm from './CommentForm'


export default function CommentSection({ comments, postId, inputFocus, setFocus }) {
    const context = useContext(AuthContext)

    return (
        <>
            <CommentsContainer>
                {comments.map(comment => <Comment key={comment.id} comment={comment} postId={postId} />)}
            </CommentsContainer>
            { context.user && <CommentForm props={{ inputFocus, setFocus }} />}
        </>
    )
}

const CommentsContainer = styled.div`
    border-top: 1px solid ${props => props.theme.borderColor};
`
