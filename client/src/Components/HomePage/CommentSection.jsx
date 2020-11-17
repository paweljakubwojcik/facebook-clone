import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMutation, gql } from '@apollo/client'

import Avatar from '../General/Avatar'
import { SquareButton } from '../General/Buttons'
import Comment from './Comment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function CommentSection({ comments, postId, inputFocus, setFocus }) {

    const avatarImage = localStorage.getItem('avatar')

    const [body, setBody] = useState('')


    const [createPost, data] = useMutation(ADD_COMMENT, {
        variables: {
            body,
            postId
        },
        update(proxy, data) {
            setBody('')
            resizableInput.current.value = ''
        },
        onError(e) {
            //TODO handle this error
            console.log(e)
        }
    })

    const resizableInput = useRef()

    useEffect(() => {
        resizableInput.current.style.height = '1px'
        resizableInput.current.style.height = resizableInput.current.scrollHeight + 'px'
        if (inputFocus)
            resizableInput.current.focus()
    }, [body, inputFocus])

    const onSubmit = (e) => {
        e.preventDefault()
        createPost()
    }

    const onChange = (e) => {
        setBody(e.target.value)
    }

    return (
        <>
            <CommentsContainer>
                {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </CommentsContainer>
            <CommentForm onSubmit={onSubmit}>
                <Avatar image={avatarImage} />
                <CommentInput ref={resizableInput} rows="1" onChange={onChange} onBlur={() => setFocus(false)} >

                </CommentInput>
                <SquareButton className='sendComment'>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </SquareButton>
            </CommentForm>
        </>
    )
}

const ADD_COMMENT = gql`
    mutation createComment( $body:String!, $postId:ID! ){
        createComment( body:$body , postId:$postId){
            id
            username
            comments {
                body
                username
                createdAt
                id
                }
           
        }
    }
`


const CommentsContainer = styled.div`

`
const CommentForm = styled.form`
    display:flex;
    margin:1em 0;
    align-items:flex-start;
    position:relative;
    .sendComment{
        
        margin-top:auto;
        right:2em;
    }
`

const CommentInput = styled.textarea`
    flex:1;
    margin: 0 .5em;
    border-radius:1em;
    padding:.5em 1em;
    box-shadow:none;
    height:2em;
    border:none;
    font-family:inherit;
    background-color:${props => props.theme.secondaryElementColor};
    color:${props => props.theme.primaryFontColor};
    resize: none;
    filter:brightness(.6);
    transition: filter .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:focus{
        filter:brightness(1);
    }
    &:hover{
        filter:brightness(1.1);
        cursor:pointer;
    }


`