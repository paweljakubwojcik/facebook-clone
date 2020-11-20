import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, gql, useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, } from '@fortawesome/free-solid-svg-icons'

import Avatar from '../General/Avatar'
import { GenericButton } from '../General/Buttons'

export default function Comment({ comment, postId }) {
    const context = useContext(AuthContext)

    const { data: { getUser: { profileImage, username } = {} } = {} } = useQuery(GET_USER_PIC, {
        variables: {
            userId: comment.user
        }
    })

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        variables: {
            postId,
            commentId: comment.id
        },
        update() {

        }
    })

    const [likeComment] = useMutation(LIKE_COMMENT, {
        variables: {
            postId,
            commentId: comment.id
        },
        update() {
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
            <Avatar image={profileImage?.medium} />
            <CommentBody>
                <header>
                    <h4>{username}</h4>
                    <Date>{moment(comment.createdAt).fromNow()}</Date>
                </header>
                {comment.body}
                <Buttons blue={comment.likesCount > 0 ? 1 : 0}>
                    <div className="counter likes" >
                        <FontAwesomeIcon className="icon" icon={faThumbsUp} />
                        {comment.likesCount}
                    </div>
                    <GenericButton onClick={(e) => handleClick(e, likeComment)} active={liked}> {liked ? 'Liked' : 'Like'} </GenericButton>
                    {context?.user?.username === username && <GenericButton onClick={(e) => handleClick(e, deleteComment)}>Delete</GenericButton>}
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
    
    & > * {
        padding:0;
        margin:0 2%;
    }

    .counter.likes{
        margin-right:auto;
        font-size:.9em;
        color:${props => props.theme.secondaryFontColor};
        .icon{
            color:${props => props.blue && props.theme.primaryColor};
            margin:0  0.5em;
        }
    }

`

const GET_USER_PIC = gql`
query getUser(  $userId: ID! ){
 getUser( userId: $userId,) {
    id
    username
    profileImage{
        medium
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
            user
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
            id
           likes{
               id
           }
           likesCount
        }
    }
}
`