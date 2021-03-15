import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

import { AuthContext } from '../../../Context/auth'
import { GenericButton } from '../../General/Buttons'

import Comment from './Comment'
import CommentForm from './CommentForm'

import { defaultCommentLimit } from '../../../Util/Constants/defaultPagination'
import { FETCH_COMMENTS } from '../../../Util/GraphQL_Queries'

export default function CommentSection({ postId, inputFocus, setFocus, commentsCount }) {
    const context = useContext(AuthContext)

    const [canFetchMore, setCanFetchMore] = useState(false)

    const { data: { post: { comments } = {} } = {}, fetchMore } = useQuery(FETCH_COMMENTS, {
        variables: {
            postId,
            limit: defaultCommentLimit,
        },
    })

    const areThereAnyComments = comments?.length > 0

    const handleRefetch = () => {
        fetchMore({
            variables: {
                cursor: areThereAnyComments ? comments[comments.length - 1].id : null,
            },
        })
    }

    useEffect(() => {
        //when all posts have been fetched
        setCanFetchMore(!(comments?.length === commentsCount))
    }, [comments, commentsCount])

    return (
        <>
            <CommentsContainer>
                {areThereAnyComments && (
                    <>
                        {comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} postId={postId} />
                        ))}
                        {canFetchMore && (
                            <GenericButton
                                onClick={handleRefetch}
                                style={{ margin: 'auto', fontSize: '.7em' }}
                            >
                                show more
                            </GenericButton>
                        )}
                    </>
                )}
            </CommentsContainer>

            {context.isLogged && <CommentForm props={{ inputFocus, setFocus, postId }} />}
        </>
    )
}

const CommentsContainer = styled.div`
    border-top: 1px solid ${(props) => props.theme.borderColor};
`
