import React, { useContext } from 'react'
import styled from 'styled-components'
import { useQuery, gql, useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'
//import { GET_USER_PIC } from '../../Util/GraphQL_Queries'

import Avatar from '../General/Avatar'
import { GenericButton } from '../General/Buttons'

export default function Comment({ comment, postId }) {
    const context = useContext(AuthContext)

    const { data: { getUser: { profileImage, username } = {} } = {} } = useQuery(GET_USER_PIC, {
        variables: {
            userId: comment.user
        }
    })

    const [deleteComment, data] = useMutation(DELETE_COMMENT, {
        variables: {
            postId,
            commentId: comment.id
        },
        update() {
            console.log(data)
        }
    })

    return (
        <Container>
            <Avatar image={profileImage?.medium} />
            <CommentBody>
                <h4>{username}</h4>
                {comment.body}
                <Buttons >
                    <GenericButton>Like</GenericButton>
                    {context.user.username === username && <GenericButton onClick={deleteComment}>Delete</GenericButton>}
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
    
`

const CommentBody = styled.div`
    min-width:15%;
    margin:0em 1em;
    margin-bottom:1em;
    position:relative;
    padding:.5em;
    border-radius:.5em;
    background-color: ${props => props.theme.roundButtonColor};

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
        margin:0 .5em;
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