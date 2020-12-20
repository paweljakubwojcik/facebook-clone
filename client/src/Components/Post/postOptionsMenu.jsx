import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../Context/auth'


import { RoundButton, MenuButton } from '../General/Buttons'
import DeleteButton from './DeleteButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import AnimatedMenu from '../General/AnimatedMenu/AnimatedMenu'
import SubMenu from '../General/AnimatedMenu/SubMenu'
import RadioButtons from '../General/AnimatedMenu/RadioButtons'



const menuTypes = {
    MAIN: 'main',
    PRIVACY: 'privacy',
}

export default function PostOptionsMenu({ isDeletable, post }) {

    const [active, setActive] = useState(menuTypes.MAIN)


    const MainMenu = () => {
        return (
            <>
                <MenuButton onClick={() => setActive(menuTypes.PRIVACY)} >
                    <FontAwesomeIcon icon={faEdit} /> <p>PrivacySettings</p>
                </MenuButton>
                {isDeletable && <DeleteButton postId={post.id} />}
            </>)
    }

    const PrivacyMenu = () => {
        const { user } = useContext(AuthContext)


        const handleClick = (e) => {
            e.target.blur()
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
            <SubMenu title={'Privacy'} setActive={setActive} >
                <RadioButtons
                    handleClick={handleClick}
                    buttons={buttons}
                    currentValue={post.privacy}
                    name={''}
                    icon={null}
                    style={{ fontSize: '1.2em' }}
                />
            </SubMenu>
        )
    }


    return (
        <AnimatedMenu
            active={active}
            setActive={setActive}
            main={<MainMenu value={menuTypes.MAIN} />}
            subMenus={[
                <PrivacyMenu value={menuTypes.PRIVACY} />
            ]}
        />


    )
}
