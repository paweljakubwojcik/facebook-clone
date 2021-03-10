import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { REACT, DELETE } from '../../../Util/GraphQL_Queries'
import { AuthContext } from '../../../Context/auth'
import moment from 'moment'

import Avatar from '../../General/Avatar'
import { GenericButton } from '../../General/Buttons'
import UserLink from '../UserLink'
import LikesCounter from '../LikesCounter'

export default function Comment({ comment, postId }) {
    const context = useContext(AuthContext)
    const { id: userId, username, profileImage } = comment.user

    const [deleteComment] = useMutation(DELETE, {
        variables: {
            id: comment.id,
        },
        update(cache, data) {
            console.log('comment has been removed')
            console.log(cache.identify(`${postId}`))

            const isSuccesfull = cache.modify({
                id: `Post:${postId}`,
                fields: {
                    comments(existingCommentRefs, { readField }) {
                        return existingCommentRefs.filter(
                            (commentRef) => comment.id !== readField('id', commentRef)
                        )
                    },
                    commentsCount(existing) {
                        return existing - 1
                    },
                },
            })
            console.log(isSuccesfull)
        },
    })

    const [likeComment] = useMutation(REACT, {
        variables: {
            id: comment.id,
            type: 'LIKE',
        },
        update() {
            console.log('comment liked')
        },
    })

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (context.userId && comment.reactions.find((like) => like.user.id === context.userId))
            setLiked(true)
        else setLiked(false)
    }, [comment.reactions, context.userId])

    const handleClick = (e, callback) => {
        e.target.blur()
        callback()
    }

    return (
        <Container>
            <Avatar image={profileImage?.urls.thumbnail} />
            <CommentBody>
                <header>
                    <h4>
                        <UserLink userId={userId}>{username}</UserLink>
                    </h4>
                    <Date>{moment(comment.createdAt).fromNow()}</Date>
                </header>
                {comment.body}
                <Buttons blue={comment.reactionsCount > 0 ? 1 : 0}>
                    <LikesCounter
                        className="likes"
                        reactionsCount={comment.reactionsCount}
                        reactions={comment.reactions}
                    />
                    <GenericButton
                        className="button"
                        onClick={(e) => handleClick(e, likeComment)}
                        active={liked}
                    >
                        {liked ? 'Liked' : 'Like'}{' '}
                    </GenericButton>
                    {context?.userId === userId && (
                        <GenericButton
                            className="button"
                            onClick={(e) => handleClick(e, deleteComment)}
                        >
                            Delete
                        </GenericButton>
                    )}
                </Buttons>
            </CommentBody>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 1em 0;
    font-size: 0.8em;
    header {
        display: flex;
    }
    & > .avatar {
        flex-shrink: 0;
    }
`

const Date = styled.p`
    color: ${(props) => props.theme.secondaryFontColor};
    font-size: 0.7em;
    margin: 0.5em;
    padding: 0;
`

const CommentBody = styled.div`
    min-width: 15%;
    margin: 0em 1em;
    margin-bottom: 1em;
    position: relative;
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: ${(props) => props.theme.roundButtonColor};
    word-wrap: break-word;
`

const Buttons = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 0.8em;
    color: ${(props) => props.theme.secondaryFontColor};
    .button {
        padding: 0;
        margin: 0 2%;
    }

    .likes {
        padding: 0;
        margin: 0 2%;
        margin-right: auto;
        font-size: 0.9em;
    }
`
