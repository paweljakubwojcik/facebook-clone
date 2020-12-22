import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../Context/auth'
import { useUserSettings } from '../../../Util/Hooks/useUserSettings'
import PostForm from './PostForm'

import Modal from '../../General/Modal'
import ElementContainer from '../../General/ElementContainer'
import AnimatedMenu from '../../General/AnimatedMenu/AnimatedMenu'

import SubMenu from '../../General/AnimatedMenu/SubMenu'
import RadioButtons from '../../General/AnimatedMenu/RadioButtons'

export default function PostFormContainer({ toggleForm, ...rest }) {

    const [active, setActive] = useState('main')

    const { user: { id } } = useContext(AuthContext)
    const { settings: { postDefaultPrivacy: privacy } = {} } = useUserSettings(id)
    const [options, setOptions] = useState(
        {
            privacy: privacy || 'PUBLIC'
        }
    )


    const PrivacyMenu = () => {

        const handleClick = (e) => {
            e.target.blur()
            setOptions(options => { return { ...options, privacy: e.target.value } })
        }

        const buttons = [
            {
                key: 'Private',
                value: 'PRIVATE'
            },
            {
                key: 'Public',
                value: 'PUBLIC'
            },
            {
                key: 'Friends Only',
                value: 'FRIENDS_ONLY'
            }
        ]

        return (
            <SubMenuContainer>
                <SubMenu title={'Privacy'} setActive={setActive} >
                    <RadioButtons
                        handleClick={handleClick}
                        buttons={buttons}
                        currentValue={options.privacy}
                        name={''}
                        icon={null}
                        style={{ fontSize: '1.2em' }}
                    />
                </SubMenu>
            </SubMenuContainer>
        )
    }

    return (
        <Modal
            toggleModal={toggleForm}
            {...rest}
        >
            <ElementContainer noPadding style={{ width: '500px' }}>
                <AnimatedMenu
                    active={active}
                    setActive={setActive}
                    main={<PostForm toggleForm={toggleForm} value={'main'} setActive={setActive} postOptions={options} />}
                    subMenus={[
                        <PrivacyMenu value={'options'} />
                    ]}
                />
            </ElementContainer>
        </Modal>

    )
}

const SubMenuContainer = styled.div`

    padding:1em;


`
