import React, { useContext, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../Context/auth'
import { useForm } from '../../../Util/Hooks/useForm'
import { useCreatePost } from '../../../Util/Hooks/useCreatePost'
import { useCreateImage } from '../../../Util/Hooks/useCreateImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import ScrollContainer from './ScrollContainer'
import Avatar from '../../General/Avatar'
import FormButton from '../../General/FormButton'
import AddButton from './AddButton'
import ImagePreview from './ImagePreview'
import ImagesContainer from '../ImagesContainer'
import Form from '../../General/Form'

//TODO: ustawienia prywatności takie fajne jak userMenu

export default function PostForm({ toggleForm, setActive }) {
    const initialState = {
        body: '',
        images: [],
    }

    const { user: { username } } = useContext(AuthContext)
    const avatar = localStorage.getItem('avatar')

    const [fileInputVisibility, setFileInputVis] = useState(false);
    const [fileInputHover, setFileInputHover] = useState(false);
    const fileInput = useRef(null)

    const { onChange, onSubmit, values, removeValue } = useForm(createPostCallback, initialState)

    const { createPost, errors, loading } = useCreatePost(values, callback)
    const { storePictures } = useCreateImage()


    async function callback(post) {
        //storing all pictures in firebase storage, throws error 
        await storePictures(values.images, post.id)

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

    const handleBodyDrag = (e) => {
        if (e.type === 'dragenter')
            setFileInputVis(true)
        if (e.type === 'dragleave' && !e.relatedTarget)
            setFileInputVis(false)
    }

    useEffect(() => {
        document.body.addEventListener('dragleave', handleBodyDrag)
        document.body.addEventListener('dragenter', handleBodyDrag)

        return () => {
            document.body.removeEventListener('dragenter', handleBodyDrag)
            document.body.removeEventListener('dragleave', handleBodyDrag)
        }
    }, [])


    const placeholder = values.images.length === 0 ?
        `Whats on your mind, ${username}?` :
        `Write something about ${values.images.length === 1 ? 'this picture' : 'those pictures'}`

    return (
        <Form
            onChange={onChange}
            onSubmit={onSubmit}
            header={'Let\'s fake some posts'}
            toggleForm={toggleForm}
        >
            <UserInfo className='userInfo'>
                <Avatar image={avatar} />
                <PrivacyContainer>
                    <h3>{username}</h3>
                    <SelectInputContainer>
                        <FontAwesomeIcon icon={faEye} style={{ fontSize: '.8em' }} />
                        <SelectInput name={'privacy'} onClick={() => setActive('options')}>
                            <option value="PRIVATE">Private</option>
                        </SelectInput>
                    </SelectInputContainer>

                </PrivacyContainer>

                <AddButton
                    style={{ marginLeft: 'auto' }}
                    type='button'
                    onClick={(e) => { fileInput.current.click(); e.target.blur() }}
                />
            </UserInfo>

            <InputWrapper >
                <TextArea
                    aria-label='post'
                    autoFocus
                    name="body"
                    id="body"
                    placeholder={placeholder} />
                <FileInput
                    ref={fileInput}
                    visibility={fileInputVisibility ? 1 : 0}
                    name='images'
                    id="file"
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={() => { setFileInputVis(false); setFileInputHover(false) }}
                    onDragEnter={() => { setFileInputHover(true) }}
                    onDragLeave={() => { setFileInputHover(false) }} />
                <Label visibility={fileInputVisibility ? 1 : 0}
                    hover={fileInputHover ? 1 : 0}
                    htmlFor='images'> Drop images here</Label>
            </InputWrapper>
            <ScrollContainer >
                <ImagesContainer noCompensation>
                    {values.images && values.images.map(image => <ImagePreview file={image} key={image.name} removeImage={removeImage} />)}
                </ImagesContainer>
            </ScrollContainer>

            {errors && <ErrorMessage>There was a problem during faking your status, please try later</ErrorMessage>}

            <FormButton
                primary
                inactive={values.body.trim().length === 0}
                loading={loading}
                loadingMessage={'Posting'}
                style={{ flexShrink: '0' }}
            >Post</FormButton>
        </Form>
    )
}



// ----------------------- styles here ----------------------------------------------


const ErrorMessage = styled.p`
    color:#c22c2c;
    font-size:.8em;
`

const UserInfo = styled.div`

    display:flex;
        width:100%;
        align-items:center;
        margin:.5em;

    
`

const PrivacyContainer = styled.div`
    h3{
        margin:0;
    }
    margin: 0 .5em;
`
const SelectInputContainer = styled.div`
    display:flex;
    align-items:center;
    color: ${props => props.theme.secondaryFontColor};

`

const SelectInput = styled.select`

    background-color:transparent;
    font-family:inherit;
    color:inherit;
    border:none;
    appearance: none;
    font-weight:bold;
    cursor: pointer;
    position:relative;
    &::after{
        display:block;
        
        content:'p';
        color:blue;
    }
    option{
        background-color:transparent;
    }

`


const TextArea = styled.textarea`
        resize: none;
        font-family:inherit;
        font-size:inherit;
        color:inherit;
        font-family:inherit;
        background-color:transparent;
        border:none;
        width:100%;
        height:100px;
`

const Label = styled.label`
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity:${props => props.visibility ? '.9' : "0"};
    background-color:${props => props.theme.primaryColor};
    font-weight:bold;
    border-radius: .5em;
    pointer-events:none;

    display:flex;
    justify-content:center;
    align-items:center;
    transition: color .3s, background-color .3s;
    color:${props => props.hover ? props.theme.primaryColor : ''};
    background-color:${props => props.hover ? props.theme.primaryFontColor : ''};

`

const FileInput = styled.input`

    position:absolute;
    left:0;
   top:0;
    opacity:0;
    width:100%;
    height:100%;

    z-index:${props => props.visibility ? '1' : "-1"};

        
`

const InputWrapper = styled.div`

    width:100%;
    position:relative;
   
`



