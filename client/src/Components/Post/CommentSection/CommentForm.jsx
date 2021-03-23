import React, { useState, useEffect, forwardRef } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import PropsTypes from 'prop-types'

import Avatar from '../../General/Avatar'
import { SquareButton } from '../../General/Buttons'
import Input from '../../General/StyledInput'
import ErrorMessage from '../../General/ErrorMessage'
import { ADD_COMMENT } from '../../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import useResizableInput from '../../../Util/Hooks/useResizableInput'
import { useCurrentUser } from '../../../Util/Hooks/useCurrentUser'

export default function CommentForm({ props: { postId, inputFocus, setFocus } }) {
    const { user: { profileImage } = {} } = useCurrentUser()
    const [body, setBody] = useState('')

    const [createComment, { error }] = useMutation(ADD_COMMENT, {
        variables: {
            body,
            postId,
        },
        update(proxy, { data }) {
            setBody('')
            resizableInput.current.value = ''
        },
        onError(e) {
            throw e
        },
    })

    const resizableInput = useResizableInput()

    useEffect(() => {
        if (inputFocus) resizableInput.current.focus()
    }, [inputFocus, resizableInput])

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
                <Avatar image={profileImage?.urls?.thumbnail} />
                <CommentInput
                    ref={resizableInput}
                    name="body"
                    rows="1"
                    onChange={onChange}
                    onBlur={() => setFocus(false)}
                    placeholder={'Write a comment...'}
                />
                <SquareButton className="sendComment">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </SquareButton>
            </Form>
            {error && <ErrorMessage textOnly>{error.message}</ErrorMessage>}
        </>
    )
}

CommentForm.propTypes = {
    props: PropsTypes.shape({
        postId: PropsTypes.string.isRequired,
        inputFocus: PropsTypes.bool.isRequired,
        setFocus: PropsTypes.func.isRequired,
    }),
}

const Form = styled.form`
    display: flex;
    margin: 1em 0;
    align-items: flex-start;
    position: relative;
    .sendComment {
        margin-top: auto;
        right: 2em;
    }
`

const CommentInput = forwardRef((props, ref) => <Input as="textarea" {...props} ref={ref} />)
