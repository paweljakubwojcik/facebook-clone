import React, { useEffect, forwardRef, useRef, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import PropsTypes from 'prop-types'

import Avatar from '../../General/Avatar'
import { GenericButton, SquareButton } from '../../General/Buttons'
import Input from '../../General/StyledInput'
import FileInput from '../../General/FileInput'
import ErrorMessage from '../../General/ErrorMessage'
import ImagePreview from '../../General/ImagePreview'

import { ADD_COMMENT } from '../../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faImages } from '@fortawesome/free-solid-svg-icons'

import useResizableInput from '../../../Util/Hooks/useResizableInput'
import { useCurrentUser } from '../../../Util/Hooks/useCurrentUser'
import { useForm } from '../../../Util/Hooks/useForm'

export default function CommentForm({ props: { postId, inputFocus, setFocus } }) {
    const { user: { profileImage } = {} } = useCurrentUser()
    const fileInput = useRef(null)
    const imagesContainer = useRef(null)
    const [offset, setOffset] = useState(0)

    const [createComment, { error }] = useMutation(ADD_COMMENT, {
        update() {
            resizableInput.current.value = ''
        },
        onError(e) {
            throw e
        },
    })

    const initialState = {
        body: '',
        images: [],
    }

    const { onChange, onSubmit, values, removeValue } = useForm(createCommentCallbact, initialState)

    async function createCommentCallbact() {
        try {
            await createComment({
                variables: {
                    ...values,
                    postId,
                },
            })
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        setOffset(imagesContainer.current?.clientHeight)
        console.log(imagesContainer.current?.clientHeight)
    }, [values])

    const resizableInput = useResizableInput({ offset })

    const removeImage = (image) => {
        removeValue({ images: image })
    }

    useEffect(() => {
        if (inputFocus) resizableInput.current.focus()
    }, [inputFocus, resizableInput])

    //console.log(values)

    return (
        <>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Avatar image={profileImage?.urls?.thumbnail} />
                <FileInput.Wrapper style={{ width: '100%', margin: 'auto 1em' }}>
                    <CommentInput
                        ref={resizableInput}
                        name="body"
                        rows="1"
                        onBlur={() => setFocus(false)}
                        placeholder={'Write a comment...'}
                        style={{ width: '100%', margin: 0, paddingRight: '2em' }}
                    />
                    <ImagesButton
                        type="button"
                        onClick={() => {
                            fileInput.current.click()
                        }}
                    >
                        <FontAwesomeIcon icon={faImages} />
                    </ImagesButton>

                    <ImagesContainer ref={imagesContainer} padding={values.images?.length ? 1 : 0}>
                        {values.images &&
                            Array.from(values.images).map((image) => (
                                <ImagePreview
                                    file={image}
                                    key={image.name}
                                    removeImage={removeImage}
                                />
                            ))}
                    </ImagesContainer>

                    <FileInput ref={fileInput} />
                </FileInput.Wrapper>
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
        margin: 0;
        height: 40px;
    }
`

const ImagesButton = styled(GenericButton)`
    position: absolute;
    top: 0;
    right: 0.5em;
`

const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    position: absolute;
    bottom: 0;
    width: 100%;

    padding: ${(props) => (props.padding ? '1em' : 0)};

    & > * {
        border-radius: 0.5rem;
        overflow: hidden;
        margin: 0.2em;
    }
`

const CommentInput = forwardRef((props, ref) => <Input as="textarea" {...props} ref={ref} />)
