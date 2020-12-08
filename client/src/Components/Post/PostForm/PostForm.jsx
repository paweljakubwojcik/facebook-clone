import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'

import Avatar from '../../General/Avatar'
import FormButton from '../../General/FormButton'

import { AuthContext } from '../../../Context/auth'
import { useForm, useCreatePost } from '../../../Util/Hooks'
import AddButton from './AddButton'
import ImagePreview from './ImagePreview'

export default function PostForm({ toggleForm }) {
    const initialState = {
        body: ''
    }

    const { user: { username } } = useContext(AuthContext)
    const avatar = localStorage.getItem('avatar')



    const [images, setImages] = useState([])
    const [fileInputVisibility, setFileInputVis] = useState(false);
    const fileInput = useRef(null)

    const { onChange, onSubmit, values } = useForm(createPostCallback, initialState)
    const [createPost, { error, loading }] = useCreatePost(values, () => {
        values.body = ''
        toggleForm(false)
    })

    // only purpose of this function is to call createPost... isn't it sad? 
    function createPostCallback() {
        createPost()
    }

    const handleFileInputChange = (e) => {
        setImages(images => [...images, ...Array.from(e.target.files)])
        setFileInputVis(false)
    }

    const removeImage = (image) => {
        setImages(images => images.filter(i => i !== image))
    }

    const handleClick = (e) => {
        if (e.target.classList.contains('modal')) {
            toggleForm(false)
        }
    }

    const placeholder = !images ? `Whats on your mind, ${username}?` : `Write something about ${images.length === 1 ? 'this picture' : 'those pictures'}`

    return (
        <Modal className='modal' onClick={handleClick}>
            <Form onSubmit={onSubmit}>
                <h2>Let's fake some posts</h2>
                <div className='userInfo'>
                    <Avatar image={avatar} />
                    <h3>{username}</h3>
                    <AddButton
                        style={{ marginLeft: 'auto' }}
                        type='button'
                        onClick={(e) => { fileInput.current.click(); e.target.blur() }}
                    />
                </div>

                <InputWrapper onDragEnter={() => { setFileInputVis(true) }} >
                    <TextArea
                        onChange={onChange}
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
                        onChange={handleFileInputChange}
                        onDragLeave={() => { setFileInputVis(false) }} />
                    <Label visibility={fileInputVisibility ? 1 : 0} for='images'> Drop image here</Label>
                </InputWrapper>

                <ImagesContainer>
                    {images && images.slice(0, 9).map(image => <ImagePreview file={image} key={image.name} removeImage={removeImage} />)}
                </ImagesContainer>

                {error && <ErrorMessage>There was a problem during faking your status, please try later</ErrorMessage>}

                <FormButton primary inactive={values.body.trim().length === 0} loading={loading} loadingMessage={'Posting'}>Post</FormButton>

            </Form>
        </Modal>
    )
}



// ----------------------- styles here ----------------------------------------------
const Modal = styled.div`
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#00000044;
`

const ErrorMessage = styled.p`
    color:#c22c2c;
    font-size:.8em;
`

const Form = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:${props => props.theme.primaryElementColor};
    padding: 1em 2em;
    width:500px;
    border-radius:.5em;
    h2{
        padding:.6em;
        text-align:center;
        border-bottom:solid 1px #ffffff22;
        width:100%;
    }
    h3{
        margin:.5em;
    }
    .userInfo{
        display:flex;
        width:100%;
        align-items:center;
        margin:.5em;
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

const FileInput = styled.input`

    position:absolute;
    left:0;
   top:0;
    opacity:0;
    width:100%;
    height:100%;
    
    z-index:${props => props.visibility ? '1' : "-1"};

`

const Label = styled.label`

    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity:${props => props.visibility ? '.6' : "0"};
    background-color:${props => props.theme.primaryColor};
    border-radius: .5em;
    pointer-events:none;

    display:flex;
    justify-content:center;
    align-items:center;

`

const InputWrapper = styled.div`

    width:100%;
    position:relative;

`

const ImagesContainer = styled.div`

    display:grid;
    grid-template-columns: repeat(auto-fit,minmax(33%,1fr));
    width:100%;
    flex-wrap:wrap;

`