import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import PostForm from './PostForm'

import Modal from '../../../Components/General/Modal'
import ElementContainer from '../../../Components/General/ElementContainer'
import AnimatedMenu from '../../../Components/General/AnimatedMenu/AnimatedMenu'
import PrivacyMenu from './PrivacyMenu'
import Form from '../../../Components/General/Form'

import { AuthContext } from '../../../Context/auth'
import { useUserSettings } from '../../../Util/Hooks/useUserSettings'

import { useForm } from '../../../Util/Hooks/useForm'
import { useCreatePost } from '../../../Util/Hooks/useCreatePost'

export default function PostFormContainer({ toggleForm, ...rest }) {
    const [active, setActive] = useState('main')

    const {
        user: { id },
    } = useContext(AuthContext)

    const { settings: { postDefaultPrivacy: privacy = 'PUBLIC' } = {} } = useUserSettings(id)

    const initialState = {
        body: '',
        images: [],
        privacy: privacy,
    }

    const { onChange, onSubmit, values, removeValue, addValue } = useForm(
        createPostCallback,
        initialState
    )

    const { createPost, errors, loading } = useCreatePost(values, callback)

    async function createPostCallback() {
        createPost()
    }

    function callback() {
        values.body = ''
        toggleForm(false)
    }

    return (
        <Modal toggleModal={toggleForm} {...rest}>
            <ElementContainer noPadding style={{ width: '500px' }}>
                <Form onChange={onChange} onSubmit={onSubmit}>
                    <Form.Header toggleForm={toggleForm}>{"Let's fake some posts"}</Form.Header>
                    <AnimatedMenu active={active} setActive={setActive}>
                        <AnimatedMenu.Primary value={'main'}>
                            <PostForm
                                setActive={setActive}
                                toggleForm={toggleForm}
                                values={values}
                                removeValue={removeValue}
                                loading={loading}
                                errors={errors}
                            />
                        </AnimatedMenu.Primary>
                        <AnimatedMenu.Secondary value={'options'} >
                            <SubMenuContainer>
                                <PrivacyMenu
                                    setPrivacy={(privacy) => addValue({ privacy: privacy })}
                                    setActive={setActive}
                                    currentPrivacy={values.privacy}
                                />
                            </SubMenuContainer>
                        </AnimatedMenu.Secondary>
                    </AnimatedMenu>
                </Form>
            </ElementContainer>
        </Modal>
    )
}

const SubMenuContainer = styled.div`
    padding: 1em;
`
