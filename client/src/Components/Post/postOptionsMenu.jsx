import React, { useState, forwardRef } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_POST } from '../../Util/GraphQL_Queries'
import { ENUMS } from '../../Util/GraphQL_Queries/Type_queries'

import { MenuButton } from '../General/Buttons'
import DeleteButton from './DeleteButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import AnimatedMenu from '../General/AnimatedMenu/AnimatedMenu'
import SubMenu from '../General/AnimatedMenu/SubMenu'
import PrivacyMenu from '../General/PrivacyMenu'
import DropDownMenu from '../General/DropDownMenu'

const menuTypes = {
    MAIN: 'main',
    PRIVACY: 'privacy',
}

const PostOptionsMenu = forwardRef(({ isDeletable, post, onDeleteCallback }, ref) => {
    const [active, setActive] = useState(menuTypes.MAIN)

    const MainMenu = () => {
        return (
            <SubMenuContainer>
                <MenuButton onClick={() => setActive(menuTypes.PRIVACY)}>
                    <FontAwesomeIcon icon={faEdit} /> <p>PrivacySettings</p>
                </MenuButton>
                {isDeletable && <DeleteButton postId={post.id} callback={onDeleteCallback} />}
            </SubMenuContainer>
        )
    }

    const Privacy = () => {
        const [editPost] = useMutation(EDIT_POST, {
            update: (cache, { data }) => {
                console.log(data)
            },
            onError: (e) => {
                console.log(e)
            },
        })

        const handleClick = (value) => {
            editPost({
                variables: {
                    postId: post.id,
                    field: 'privacy',
                    newValue: value,
                },
            })
        }

        return (
            <SubMenuContainer>
                <SubMenu setActive={setActive} title={'Privacy'}>
                    <PrivacyMenu
                        setPrivacy={handleClick}
                        currentPrivacy={post.privacy}
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
                    <Privacy />
                </AnimatedMenu.Secondary>
            </AnimatedMenu>
        </DropDownMenu>
    )
})

export default PostOptionsMenu

const SubMenuContainer = styled.div`
    padding: 0.5em;
`
