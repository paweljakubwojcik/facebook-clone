import React, { useRef } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import Avatar from '../../../Components/General/Avatar'

import AddButton from './AddButton'
import ImagePreview from '../../../Components/General/ImagePreview'
import ImagesContainer from '../../../Components/Post/ImagesContainer'
import Form from '../../../Components/General/Form'
import FileInput from '../../../Components/General/FileInput'
import { useCurrentUser } from '../../../Util/Hooks/useCurrentUser'

export default function PostForm({ setActive, values, removeValue, loading, errors }) {
    const { user: { username, profileImage } = {} } = useCurrentUser()

    const removeImage = (image) => {
        removeValue({ images: image })
    }

    const fileInput = useRef(null)

    const placeholder =
        values.images.length === 0
            ? `Whats on your mind, ${username}?`
            : `Write something about ${
                  values.images.length === 1 ? 'this picture' : 'those pictures'
              }`

    return (
        <Form.FlexContainer>
            <Form.UserInfo>
                <Avatar image={profileImage?.urls?.thumbnail} />
                <PrivacyContainer>
                    <h3>{username}</h3>
                    <SelectInputContainer>
                        <SelectInput
                            name={'privacy'}
                            onClick={() => setActive('options')}
                            type="button"
                        >
                            {(
                                values.privacy.slice(0, 1) + values.privacy.slice(1).toLowerCase()
                            ).replace('_', ' ')}
                        </SelectInput>
                        <FontAwesomeIcon
                            icon={faEye}
                            style={{ fontSize: '.8em', margin: '0 .5em' }}
                        />
                    </SelectInputContainer>
                </PrivacyContainer>

                <AddButton
                    style={{ marginLeft: 'auto' }}
                    type="button"
                    onClick={(e) => {
                        fileInput.current.click()
                        e.target.blur()
                    }}
                />
            </Form.UserInfo>
            <FileInput.Wrapper>
                <Form.TextArea
                    aria-label="post"
                    autoFocus
                    name="body"
                    id="body"
                    placeholder={placeholder}
                />
                <FileInput ref={fileInput} />
            </FileInput.Wrapper>
            <ImagesContainer.ScrollContainer>
                <ImagesContainer noCompensation>
                    {values.images &&
                        Array.from(values.images).map((image) => (
                            <ImagePreview file={image} key={image.name} removeImage={removeImage} />
                        ))}
                </ImagesContainer>
            </ImagesContainer.ScrollContainer>

            {errors?.length &&
                errors.map((error, i) => <ErrorMessage key={i}>{error?.message}</ErrorMessage>)}

            <Form.Button
                primary
                inactive={values.body.trim().length === 0}
                loading={loading}
                loadingMessage={'Posting'}
                style={{ flexShrink: '0' }}
            >
                Post
            </Form.Button>
        </Form.FlexContainer>
    )
}

// ----------------------- styles here ----------------------------------------------

const ErrorMessage = styled.p`
    color: #c22c2c;
    font-size: 0.8em;
`

const PrivacyContainer = styled.div`
    h3 {
        margin: 0;
    }
    margin: 0 0.5em;
`
const SelectInputContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.secondaryFontColor};
`

const SelectInput = styled.button`
    background-color: transparent;
    font-family: inherit;
    color: inherit;
    border: none;
    appearance: none;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    padding: 0;
    transition: color 0.4s;
    &:hover,
    &:focus {
        color: ${(props) => props.theme.primaryColor};
    }
`
