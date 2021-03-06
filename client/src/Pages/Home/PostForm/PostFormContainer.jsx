import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import PostForm from './PostForm'

import Modal from '../../../Components/General/Modal'
import ElementContainer from '../../../Components/General/ElementContainer'
import AnimatedMenu from '../../../Components/General/AnimatedMenu/AnimatedMenu'
import SubMenu from '../../../Components/General/AnimatedMenu/SubMenu'

import PrivacyMenu from '../../../Components/General/PrivacyMenu'
import Form from '../../../Components/General/Form'

import { useUserSettings } from '../../../Util/Hooks/useUserSettings'

import { useForm } from '../../../Util/Hooks/useForm'
import { useCreatePost } from '../../../Util/Hooks/useCreatePost'
import { CurrentUserContext } from '../../../Context/currentUserContext'

export default function PostFormContainer({ toggleForm, ...rest }) {
    const [active, setActive] = useState('form')

    const { user: { settings: { postDefaultPrivacy: privacy = 'PUBLIC' } = {} } = {} } = useContext(
        CurrentUserContext
    )

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
                        <AnimatedMenu.Primary value={'form'}>
                            <PostForm
                                setActive={setActive}
                                toggleForm={toggleForm}
                                values={values}
                                removeValue={removeValue}
                                loading={loading}
                                errors={errors}
                            />
                        </AnimatedMenu.Primary>
                        <AnimatedMenu.Secondary value={'options'}>
                            <SubMenuContainer>
                                <SubMenu title={'Privacy'} setActive={setActive}>
                                    <PrivacyMenu
                                        setPrivacy={(privacy) => addValue({ privacy: privacy })}
                                        currentPrivacy={values.privacy}
                                        style={{ fontSize: '1.2em' }}
                                    />
                                </SubMenu>
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
