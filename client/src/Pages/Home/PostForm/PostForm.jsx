import React, { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../Context/auth'
import { useForm } from '../../../Util/Hooks/useForm'
import { useCreatePost } from '../../../Util/Hooks/useCreatePost'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import Avatar from '../../../Components/General/Avatar'

import AddButton from './AddButton'
import ImagePreview from './ImagePreview'
import ImagesContainer from '../../../Components/Post/ImagesContainer'
import Form from '../../../Components/General/Form'
import FileInput from './FileInput'

export default function PostForm({ toggleForm, setActive, postOptions }) {
    const {
        user: { username },
    } = useContext(AuthContext)

    const avatar = localStorage.getItem('avatar')

    const initialState = {
        body: '',
        images: [],
        privacy: postOptions.privacy,
    }

    const { onChange, onSubmit, values, removeValue, addValue } = useForm(createPostCallback, initialState)

    const { createPost, errors, loading } = useCreatePost(values, callback)

    function callback() {
        values.body = ''
        toggleForm(false)
    }

    // only purpose of this function is to call createPost... isn't it sad?
    async function createPostCallback() {
        createPost()
    }

    const removeImage = (image) => {
        removeValue({ images: image })
    }

    //that's weird way of adding value to form, but I haven't thought of it before so I had to choose: those couple lines or rewrite whole form component
    useEffect(() => {
        console.log('rerender')
        addValue({ privacy: postOptions.privacy })
    }, [postOptions, addValue])

    const fileInput = useRef(null)

    const placeholder =
        values.images.length === 0
            ? `Whats on your mind, ${username}?`
            : `Write something about ${values.images.length === 1 ? 'this picture' : 'those pictures'}`

    return (
        <Form onChange={onChange} onSubmit={onSubmit}>
            <Form.Header toggleForm={toggleForm}>{"Let's fake some posts"}</Form.Header>

            <UserInfo className="userInfo">
                <Avatar image={avatar} />
                <PrivacyContainer>
                    <h3>{username}</h3>
                    <SelectInputContainer>
                        <SelectInput name={'privacy'} onClick={() => setActive('options')} type="button">
                            {(postOptions.privacy.slice(0, 1) + postOptions.privacy.slice(1).toLowerCase()).replace('_', ' ')}
                        </SelectInput>
                        <FontAwesomeIcon icon={faEye} style={{ fontSize: '.8em', margin: '0 .5em' }} />
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
            </UserInfo>

            <FileInputWrapper>
                <TextArea aria-label="post" autoFocus name="body" id="body" placeholder={placeholder} />
                <FileInput ref={fileInput} />
            </FileInputWrapper>
            <ImagesContainer.ScrollContainer>
                <ImagesContainer noCompensation>
                    {values.images && Array.from(values.images).map((image) => <ImagePreview file={image} key={image.name} removeImage={removeImage} />)}
                </ImagesContainer>
            </ImagesContainer.ScrollContainer>

            {errors && <ErrorMessage>There was a problem during faking your status, please try later</ErrorMessage>}

            <Form.Button primary inactive={values.body.trim().length === 0} loading={loading} loadingMessage={'Posting'} style={{ flexShrink: '0' }}>
                Post
            </Form.Button>
        </Form>
    )
}

// ----------------------- styles here ----------------------------------------------

const ErrorMessage = styled.p`
    color: #c22c2c;
    font-size: 0.8em;
`

const UserInfo = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0.5em;
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

const TextArea = styled.textarea`
    resize: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    font-family: inherit;
    background-color: transparent;
    border: none;
    width: 100%;
    height: 100px;
`

const FileInputWrapper = styled.div`
    width: 100%;
    position: relative;
`
