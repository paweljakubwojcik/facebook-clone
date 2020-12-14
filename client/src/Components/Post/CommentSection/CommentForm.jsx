import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMutation, gql } from '@apollo/client'
import PropsTypes from 'prop-types'

import Avatar from '../../General/Avatar'
import { SquareButton } from '../../General/Buttons'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


export default function CommentForm({ props: { postId, inputFocus, setFocus } }) {
    const avatarImage = localStorage.getItem('avatar')

    const [body, setBody] = useState('')

    const [createPost] = useMutation(ADD_COMMENT, {
        variables: {
            body,
            postId
        },
        update(proxy, data) {
            setBody('')
            resizableInput.current.value = ''
        },
        onError(e) {
            //TODO: handle this error on the front
            throw e
        }
    })

    const resizableInput = useRef(null)

    useEffect(() => {
        resizableInput.current.style.height = '1px'
        resizableInput.current.style.height = resizableInput.current.scrollHeight + 'px'

    }, [body])

    useEffect(() => {
        if (inputFocus)
            resizableInput.current.focus()
    }, [inputFocus])

    const onSubmit = (e) => {
        e.preventDefault()
        createPost()
    }

    const onChange = (e) => {
        setBody(e.target.value)
    }

    return (
        <Form onSubmit={onSubmit}>
            <Avatar image={avatarImage} />
            <CommentInput ref={resizableInput} rows="1" onChange={onChange} onBlur={() => setFocus(false)} />
            <SquareButton className='sendComment'>
                <FontAwesomeIcon icon={faPaperPlane} />
            </SquareButton>
        </Form>
    )
}

CommentForm.propTypes = {
    props: PropsTypes.shape({
        postId: PropsTypes.string.isRequired,
        inputFocus: PropsTypes.bool.isRequired,
        setFocus: PropsTypes.func.isRequired,
    })
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


const Form = styled.form`
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
    filter:opacity(.8);
    transition: background-color .3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter .3s;
    &:focus{
        filter:opacity(1);
        
    }
    &:hover{
        background-color:${props => props.theme.secondaryElementHover};
        filter:opacity(1);
        cursor:pointer;
    }
    &:focus:hover{
        cursor:text;
    }


`