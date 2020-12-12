import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../Context/auth'
import { useForm } from '../../../Util/Hooks/useForm'
import { useCreatePost } from '../../../Util/Hooks/useCreatePost'



import Avatar from '../../General/Avatar'
import FormButton from '../../General/FormButton'
import AddButton from './AddButton'
import ImagePreview from './ImagePreview'
import ImagesContainer from '../ImagesContainer'

export default function PostForm({ toggleForm }) {
    const initialState = {
        body: '',
        images: [],
    }

    const { user: { username } } = useContext(AuthContext)
    const avatar = localStorage.getItem('avatar')

    const [fileInputVisibility, setFileInputVis] = useState(false);
    const [fileInputHover, setFileInputHover] = useState(false);
    const fileInput = useRef(null)
    const modal = useRef(null)

    const { onChange, onSubmit, values, removeValue } = useForm(createPostCallback, initialState)

    const [createPost, errors, loading] = useCreatePost(values, callback)
    //
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

    const handleClick = (e) => {
        if (e.target.classList.contains('modal')) {
            toggleForm(false)
        }
    }

    const handleModalOnDrag = (e) => {
        if (modal.current === e.target)
            setFileInputVis(false)
    }

    const placeholder = values.images.length === 0 ?
        `Whats on your mind, ${username}?` :
        `Write something about ${values.images.length === 1 ? 'this picture' : 'those pictures'}`

    return (
        <Modal className='modal'
            ref={modal}
            onClick={handleClick}
            onDragEnter={() => { setFileInputVis(true) }}
            onDragLeave={handleModalOnDrag}>
            <Form onSubmit={onSubmit} onChange={onChange}>
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

                <InputWrapper onDragEnter={() => { setFileInputVis(true) }}>
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

                <ImagesContainer noCompensation>
                    {values.images && values.images.slice(0, 9).map(image => <ImagePreview file={image} key={image.name} removeImage={removeImage} />)}
                </ImagesContainer>

                {errors && <ErrorMessage>There was a problem during faking your status, please try later</ErrorMessage>}

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
    overflow-y:auto;
`

const ErrorMessage = styled.p`
    color:#c22c2c;
    font-size:.8em;
`

const Form = styled.form`
    margin:100px 0;
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
