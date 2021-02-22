import React, { useState, forwardRef } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { EDIT_POST } from '../../Util/GraphQL_Queries'

import { MenuButton } from '../General/Buttons'
import DeleteButton from './DeleteButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import AnimatedMenu from '../General/AnimatedMenu/AnimatedMenu'
import SubMenu from '../General/AnimatedMenu/SubMenu'
import RadioButtons from '../General/AnimatedMenu/RadioButtons'
import DropDownMenu from '../General/DropDownMenu'

const menuTypes = {
    MAIN: 'main',
    PRIVACY: 'privacy',
}

const PostOptionsMenu = forwardRef(({ isDeletable, post }, ref) => {
    const [active, setActive] = useState(menuTypes.MAIN)

    const MainMenu = () => {
        return (
            <SubMenuContainer>
                <MenuButton onClick={() => setActive(menuTypes.PRIVACY)}>
                    <FontAwesomeIcon icon={faEdit} /> <p>PrivacySettings</p>
                </MenuButton>
                {isDeletable && <DeleteButton postId={post.id} />}
            </SubMenuContainer>
        )
    }

    const PrivacyMenu = () => {
        const [editPost] = useMutation(EDIT_POST, {
            update: (cache, data) => {
                console.log(data)
            },
            onError: (e) => {
                console.log(e)
            },
        })

        const handleClick = (e) => {
            e.target.blur()
            editPost({
                variables: {
                    postId: post.id,
                    field: 'privacy',
                    newValue: e.target.value,
                },
            })
        }

        const buttons = [
            {
                key: 'Private',
                value: 'PRIVATE',
            },
            {
                key: 'Public',
                value: 'PUBLIC',
            },
            {
                key: 'Friends Only',
                value: 'FRIENDS_ONLY',
            },
        ]

        return (
            <SubMenuContainer>
                <SubMenu title={'Privacy'} setActive={setActive}>
                    <RadioButtons
                        handleClick={handleClick}
                        buttons={buttons}
                        currentValue={post.privacy}
                        name={''}
                        icon={null}
                        style={{ fontSize: '1.2em' }}
                    />
                </SubMenu>
            </SubMenuContainer>
        )
    }

    return (
        <DropDownMenu ref={ref}>
            <AnimatedMenu active={active} setActive={setActive}>
                <AnimatedMenu.Primary value={menuTypes.MAIN}>
                    <MainMenu />
                </AnimatedMenu.Primary>
                <AnimatedMenu.Secondary value={menuTypes.PRIVACY}>
                    <PrivacyMenu />
                </AnimatedMenu.Secondary>
            </AnimatedMenu>
        </DropDownMenu>
    )
})

export default PostOptionsMenu

const SubMenuContainer = styled.div`
    padding: 0.5em;
`
