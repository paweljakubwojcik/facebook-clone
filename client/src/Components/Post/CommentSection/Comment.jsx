import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, gql, useMutation } from '@apollo/client'
import { BASE_COMMENT_FRAGMENT } from '../../../Util/GraphQL_Queries'
import { AuthContext } from '../../../Context/auth'
import moment from 'moment'

import Avatar from '../../General/Avatar'
import { GenericButton } from '../../General/Buttons'
import UserLink from '../UserLink'
import LikesCounter from '../LikesCounter'

export default function Comment({ comment, postId }) {
    const context = useContext(AuthContext)
    const { id: userId, username } = comment.user

    //because getting all info about user straight in posts query qoused some problems
    const { data: { user: { profileImage } = {} } = {} } = useQuery(GET_USER_PIC, {
        variables: {
            userId
        }
    })

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        variables: {
            postId,
            commentId: comment.id
        },
        update() {
            console.log('comment deleted')
        }
    })

    const [likeComment] = useMutation(LIKE_COMMENT, {
        variables: {
            postId,
            commentId: comment.id
        },
        update() {
            console.log('comment liked')
        }
    })

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (context.user && comment.likes.find(like => like.username === context.user.username))
            setLiked(true)
        else
            setLiked(false)

    }, [comment.likes, context.user])

    const handleClick = (e, callback) => {
        e.target.blur()
        callback()
    }

    return (
        <Container>
            <Avatar image={profileImage?.urls.small} />
            <CommentBody>
                <header>
                    <h4><UserLink userId={userId}>{username}</UserLink></h4>
                    <Date>{moment(comment.createdAt).fromNow()}</Date>
                </header>
                {comment.body}
                <Buttons blue={comment.likesCount > 0 ? 1 : 0}>
                    <LikesCounter className="likes" likesCount={comment.likesCount} likes={comment.likes} />
                    <GenericButton className="button" onClick={(e) => handleClick(e, likeComment)} active={liked}> {liked ? 'Liked' : 'Like'} </GenericButton>
                    {context?.user?.username === username && <GenericButton className="button" onClick={(e) => handleClick(e, deleteComment)}>Delete</GenericButton>}
                </Buttons>
            </CommentBody>

        </Container>
    )
}

const Container = styled.div`
    display:flex;
    align-items:flex-start;
    margin: 1em 0;
    font-size:.8em;
    header{
        display:flex;
    }
    & > .avatar {
        flex-shrink:0;
    }

`

const Date = styled.p`

    color: ${props => props.theme.secondaryFontColor};
    font-size:.7em;
    margin:.5em;
    padding:0;
`

const CommentBody = styled.div`
    min-width:15%;
    margin:0em 1em;
    margin-bottom:1em;
    position:relative;
    padding:.5em;
    border-radius:.5em;
    background-color: ${props => props.theme.roundButtonColor};
    word-wrap:break-word;
`

const Buttons = styled.div`
    position:absolute;
    top:100%;
    right:0;
    width:100%;
    display:flex;
    justify-content:flex-end;
    font-size:.8em;
    color:${props => props.theme.secondaryFontColor};
    .button {
        padding:0;
        margin:0 2%;
    }

    .likes{
        padding:0;
        margin:0 2%;
        margin-right:auto;
        font-size:.9em;
    }

`

const GET_USER_PIC = gql`
query user(  $userId: ID! ){
 user( userId: $userId,) {
    id
    username
    profileImage{
        urls{
            id
            small
            medium
        }
    }
    }
}
`

const DELETE_COMMENT = gql`
mutation deleteComment($postId:ID! , $commentId:ID!){
    deleteComment(
        postId:$postId,
        commentId:$commentId
    ){
        id
        commentsCount
        comments{
            id
            body
            user{
                id
            }
            username
        }
    }
}
`

const LIKE_COMMENT = gql`
mutation likeComment($postId:ID! , $commentId:ID!){
    likeComment(
        postId:$postId,
        commentId:$commentId
    ){
        id
        comments{
             ...BaseComment
            likes{
                id
                }
            likesCount
        }
    }
}
${BASE_COMMENT_FRAGMENT}
`