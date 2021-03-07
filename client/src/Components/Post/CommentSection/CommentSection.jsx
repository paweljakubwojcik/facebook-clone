import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { AuthContext } from '../../../Context/auth'
import { GenericButton } from '../../General/Buttons'

import Comment from './Comment'
import CommentForm from './CommentForm'

const initialLimit = 2

export default function CommentSection({ comments, postId, inputFocus, setFocus }) {
    const context = useContext(AuthContext)

    const [limit, setLimit] = useState(initialLimit)
    const isThereMore = comments.length - limit > 0

    return (
        <>

            <CommentsContainer>
                {comments.slice(0, limit).map(comment => <Comment key={comment.id} comment={comment} postId={postId} />)}
                {isThereMore &&
                    <GenericButton
                        onClick={() => setLimit(prev => prev + initialLimit)}
                        style={{ margin: 'auto', fontSize: '.7em' }}
                    >
                        show more
                 </GenericButton>}
            </CommentsContainer>

            { context.isLogged && <CommentForm props={{ inputFocus, setFocus, postId }} />}
        </>
    )
}

const CommentsContainer = styled.div`
    border-top: 1px solid ${props => props.theme.borderColor};
`
