import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'

import { MenuButton } from '../General/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { DELETE_POST } from '../../Util/GraphQL_Queries'
import AreYouSureBox from '../General/AreYouSureBox'

export default function DeleteButton({ postId, callback }) {
    const id = postId

    const [deletePost, { loading }] = useMutation(DELETE_POST, {
        variables: { postId: id },
        update(cache) {
            cache.evict({ id: `Post:${id}` }) // the most simple way to cleanup cache
            if (callback) callback()
        },
        onError(err) {
            //TODO: HANDLE ERROR
            throw err
        },
    })

    const [areSure, setAreSure] = useState(false)

    const handleOnClick = (e) => {
        e.target.blur()
        setAreSure(true)
    }

    return (
        <>
            <StyledMenuButton
                onClick={handleOnClick}
                inactive={loading}
                className="postCard__button"
            >
                <FontAwesomeIcon icon={faTrash} />
                <p>Delete post</p>
            </StyledMenuButton>
            {areSure && (
                <AreYouSureBox callback={deletePost} close={() => setAreSure(false)}>
                    Are you sure you wanna delete that post?
                </AreYouSureBox>
            )}
        </>
    )
}

const StyledMenuButton = styled(MenuButton)`
    &:hover,
    &:focus {
        color: ${(props) => props.theme.errorColor};
    }
`
