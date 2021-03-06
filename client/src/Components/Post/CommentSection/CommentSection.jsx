import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

import { AuthContext } from '../../../Context/auth'
import { GenericButton } from '../../General/Buttons'

import Comment from './Comment'
import CommentForm from './CommentForm'

import { defaultCommentLimit } from '../../../Util/Constants/defaultPagination'
import { FETCH_COMMENTS } from '../../../Util/GraphQL_Queries'
import DotLoader from '../../General/DotLoader'

export default function CommentSection({ postId, inputFocus, setFocus, commentsCount }) {
    const context = useContext(AuthContext)

    const [canFetchMore, setCanFetchMore] = useState(false)
    const [loading, setLoading] = useState(false)

    const { data: { post: { comments } = {} } = {}, fetchMore, loading: initialLoading } = useQuery(
        FETCH_COMMENTS,
        {
            variables: {
                postId,
                limit: defaultCommentLimit,
                sort: 'DESCENDING',
                sortBy: 'timestamp',
            },
            onError: (error) => {
                throw error
            },
        }
    )

    const areThereAnyComments = comments?.length > 0

    const handleRefetch = async () => {
        setLoading(true)
        await fetchMore({
            variables: {
                cursor: areThereAnyComments ? comments[comments.length - 1].id : null,
            },
        })
        setLoading(false)
    }

    useEffect(() => {
        //when all posts have been fetched
        setCanFetchMore(!(comments?.length === commentsCount))
    }, [comments, commentsCount])

    return (
        <>
            <CommentsContainer>
                {commentsCount !== 0 && (
                    <>
                        {comments &&
                            comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} postId={postId} />
                            ))}
                        {canFetchMore && !loading && !initialLoading && (
                            <GenericButton
                                onClick={handleRefetch}
                                style={{ margin: 'auto', fontSize: '.7em' }}
                            >
                                show more
                            </GenericButton>
                        )}
                        {(loading || initialLoading) && (
                            <DotLoader
                                style={{
                                    width: '3rem',
                                    margin: 'auto',
                                    height: '3rem',
                                    fontSize: '.4em',
                                }}
                            />
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
