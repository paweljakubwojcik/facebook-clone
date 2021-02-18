import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMutation, gql } from '@apollo/client'
import PropsTypes from 'prop-types'

import Avatar from '../../General/Avatar'
import { SquareButton } from '../../General/Buttons'
import ErrorMessage from '../../General/ErrorMessage'
import { BASE_COMMENT_FRAGMENT } from '../../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import useResizableInput from '../../../Util/Hooks/useResizableInput'


export default function CommentForm({ props: { postId, inputFocus, setFocus } }) {
    const avatarImage = localStorage.getItem('avatar')

    const [body, setBody] = useState('')

    const [createComment, { error }] = useMutation(ADD_COMMENT, {
        variables: {
            body,
            postId
        },
        update(proxy, { data }) {
            console.log(data)
            setBody('')
            resizableInput.current.value = ''
        },
        onError(e) {
            //TODO: handle this error on the front
            throw e

        }
    })

    const resizableInput = useResizableInput()

    useEffect(() => {
        if (inputFocus)
            resizableInput.current.focus()
    }, [inputFocus])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await createComment()
        } catch (error) {
            console.log(error)
        }

    }

    const onChange = (e) => {
        setBody(e.target.value)
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Avatar image={avatarImage} />
                <CommentInput
                    ref={resizableInput}
                    name='body'
                    rows="1"
                    onChange={onChange}
                    onBlur={() => setFocus(false)}
                />
                <SquareButton className='sendComment'>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </SquareButton>
            </Form>
            {error && <ErrorMessage textOnly>Comment cant be empty</ErrorMessage>}
        </>
    )
}

CommentForm.propTypes = {
    props: PropsTypes.shape({
        postId: PropsTypes.string.isRequired,
        inputFocus: PropsTypes.bool.isRequired,
        setFocus: PropsTypes.func.isRequired,
    })
}

/*
ISSUE - POTENTIAL SOURCE OF BUGS in future
This must be exacly the same shape as comments on getPosts query,
otherwise apollo makes new request to server to get rest of fields 
and as a result pagination breaks 
 
SOLVED
using GraphQL Fragments,
in other words making sure that apollo doesnt need to refetch missing fields 
*/
const ADD_COMMENT = gql`
    mutation createComment( $body:String!, $postId:ID! ){
        createComment( body:$body , postId:$postId){
            id
            username
            comments {
               ...BaseComment
            }
           
        }
    }
    ${BASE_COMMENT_FRAGMENT}
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