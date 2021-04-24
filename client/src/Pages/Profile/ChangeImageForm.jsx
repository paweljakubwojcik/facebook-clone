import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from '../../Util/Hooks/useForm'
import { useUpdatePicture } from '../../Util/Hooks/useUpdatePicture'
import useResizableInput from '../../Util/Hooks/useResizableInput'

import Modal from '../../Components/General/Modal'
import Form from '../../Components/General/Form'
import ElementContainer from '../../Components/General/ElementContainer'

import AnimatedMenu from '../../Components/General/AnimatedMenu/AnimatedMenu'

import ImagesContainer from '../../Components/Post/ImagesContainer'
import PictureLink from '../../Components/General/PictureLink'
import FormButton from '../../Components/General/FormButton'
import { SquareButton } from '../../Components/General/Buttons'
import FileImage from '../../Components/General/FileImage'


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

    async function addPicture() {
        await updatePicture()
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
            setPreview(image[0])
        }
        return () => {}
    }, [image, isFile, user])

    const resizableInput = useResizableInput({ maxHeight: 120 })

    const [active, setActive] = useState('main')
    useEffect(() => {
        setActive(image ? 'imgPreview' : 'main')
    }, [image])

    return (
        <Modal toggleModal={toggleForm}>
            <ElementContainer noPadding style={{ width: '500px' }}>
                <Form onChange={onChange} onSubmit={onSubmit}>
                    <Form.Header toggleForm={toggleForm}>{`Update ${type} picture`}</Form.Header>
                    <AnimatedMenu active={active}>
                        <AnimatedMenu.Primary value={'main'}>
                            <Form.FlexContainer>
                                <FormButton
                                    primary
                                    type="button"
                                    onClick={() => setActive('choose')}
                                >
                                    Choose from images
                                </FormButton>

                                <FormButton
                                    primary
                                    type="button"
                                    onClick={() => fileInput.current.click()}
                                >
                                    Add new
                                </FormButton>
                                <UploadImage
                                    type="file"
                                    ref={fileInput}
                                    name="image"
                                    accept=".jpg, .png, .jpeg"
                                />
                            </Form.FlexContainer>
                        </AnimatedMenu.Primary>
                        <AnimatedMenu.Secondary value={'choose'}>
                            <Form.FlexContainer>
                                <Tittle>Choose from your pictures</Tittle>
                                <ImagesContainer.ScrollContainer>
                                    <ImagesContainer noCompensation>
                                        {user.images.map((image) => (
                                            <PictureLink
                                                onClick={() => addValue({ image: image.id })}
                                                as="div"
                                                key={image.id}
                                                picture={image}
                                            />
                                        ))}
                                    </ImagesContainer>
                                </ImagesContainer.ScrollContainer>
                                <SquareButton type="button" onClick={() => setActive('main')}>
                                    Cancel
                                </SquareButton>
                            </Form.FlexContainer>
                        </AnimatedMenu.Secondary>

                        <AnimatedMenu.Secondary
                            value={'imgPreview'}
                            onExited={() => addValue({ image: null })}
                        >
                            {preview && (
                                <FileImage file={preview}>
                                    {(url) => (
                                        <ProfilePreview img={url} round={type === 'profile'} />
                                    )}
                                </FileImage>
                            )}

                            {isFile && (
                                <Form.TextArea
                                    ref={resizableInput}
                                    rows="1"
                                    name={'body'}
                                    placeholder={'say something about this image'}
                                />
                            )}
                            <Buttons>
                                {!loading && (
                                    <SquareButton type="button" onClick={() => setActive('main')}>
                                        Cancel
                                    </SquareButton>
                                )}
                                <FormButton primary type="submit" loading={loading}>
                                    Save
                                </FormButton>
                            </Buttons>
                        </AnimatedMenu.Secondary>
                    </AnimatedMenu>
                </Form>
            </ElementContainer>
        </Modal>
    )
}

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
    background-image: url(${(props) => props.img});
    padding-bottom: 100%;
    border-radius: ${(props) => (props.round ? '50%' : '0')};
`
const Buttons = styled.div`
    padding: 1em 0;
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
