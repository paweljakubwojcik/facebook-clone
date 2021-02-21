import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from '../../Util/Hooks/useForm'
import { useUpdatePicture } from '../../Util/Hooks/useUpdatePicture'
import useResizableInput from '../../Util/Hooks/useResizableInput'

import ModalForm from '../../Components/General/ModalForm'

import ImagesContainer from '../../Components/Post/ImagesContainer'
import PictureLink from '../../Components/General/PictureLink'
import FormButton from '../../Components/General/FormButton'
import { SquareButton } from '../../Components/General/Buttons'
import ScrollContainer from '../../Components/Post/PostForm/ScrollContainer'

const enumTypes = {
    profile: 'profileImage',
    background: 'backgroundImage',
}

export default function ChangeImageForm({ toggleForm, user, type }) {
    const fileInput = useRef(null)

    const [preview, setPreview] = useState(null)

    const initialState = {
        image: null,
    }
    const {
        onChange,
        onSubmit,
        values: { image, body },
        addValue,
    } = useForm(addPicture, initialState)

    const field = enumTypes[type]

    const { updatePicture, loading } = useUpdatePicture({ image, body }, callback, field)

    function addPicture() {
        updatePicture()
    }

    function callback() {
        toggleForm(false)
    }

    const isFile = typeof image === 'object' && !!image

    useEffect(() => {
        if (!isFile) {
            const preview = user.images.filter((img) => img.id === image)[0]?.urls?.medium
            setPreview(preview)
        }
        if (isFile) {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                const arrayBuffer = fileReader.result
                const blob = new Blob([arrayBuffer], [image[0].type])
                const blobUrl = URL.createObjectURL(blob)
                setPreview(blobUrl)
            }
            fileReader.readAsArrayBuffer(image[0])
        }
        return () => {}
    }, [image, isFile, user])

    const resizableInput = useResizableInput({ maxHeight: 120 })

    return (
        <ModalForm header={`Update ${type} picture`} toggleForm={toggleForm} onChange={onChange} onSubmit={onSubmit}>
            {!image ? (
                <>
                    <Tittle>Choose from your pictures</Tittle>
                    <ScrollContainer>
                        <ImagesContainer noCompensation>
                            {user.images.map((image) => (
                                <PictureLink onClick={() => addValue({ image: image.id })} as="div" key={image.id} picture={image} />
                            ))}
                        </ImagesContainer>
                    </ScrollContainer>
                    <FormButton primary type="button" onClick={() => fileInput.current.click()}>
                        Add new
                    </FormButton>
                    <UploadImage type="file" ref={fileInput} name="image" />
                </>
            ) : (
                <>
                    {preview && <ProfilePreview img={preview} round={type === 'profile'} />}
                    {isFile && <Input ref={resizableInput} rows="1" name={'body'} placeholder={'say something about this image'} />}
                    <Buttons>
                        {!loading && (
                            <SquareButton type="button" onClick={() => addValue({ image: null })}>
                                Cancel
                            </SquareButton>
                        )}
                        <FormButton primary type="submit" loading={loading}>
                            Save
                        </FormButton>
                    </Buttons>
                </>
            )}
        </ModalForm>
    )
}

const Input = styled.textarea`
    padding: 0.5em 1em;
    height: 2em;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    font-family: inherit;
    background-color: transparent;
    border: none;
    width: 100%;
    flex-shrink: 0;
    resize: none;
`

const Tittle = styled.div`
    margin: 0.5em 0;
`

const ProfilePreview = styled.div`
    margin: 0.5em 0;
    display: block;
    width: 100%;
    overflow: hidden;
    box-shadow: ${(props) => props.theme.standardShadow};
    background-position: center;
    background-size: cover;
    background-image: url(${(props) => props.img.replace('(', '\\(').replace(')', '\\)')});
    padding-bottom: 100%;
    border-radius: ${(props) => (props.round ? '50%' : '0')};
`
const Buttons = styled.div`
    margin: 1em 0;
    display: flex;
    width: 100%;
    justify-content: center;
    & > * {
        margin: 0 0.5em;
    }
`

const UploadImage = styled.input`
    opacity: 0;
    width: 1px;
    position: absolute;
    top: -10000px;
`
