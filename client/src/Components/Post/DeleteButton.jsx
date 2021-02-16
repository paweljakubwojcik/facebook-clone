import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useLocation } from 'react-router-dom'

import { MenuButton } from '../General/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { DELETE_POST, GET_POSTS } from '../../Util/GraphQL_Queries'
import AreYouSureBox from '../General/AreYouSureBox'

export default function DeleteButton({ postId }) {
    const id = postId

    const { pathname } = useLocation()
    const userId = pathname.split('/')[2];

    const [deletePost, { loading }] = useMutation(DELETE_POST, {
        variables: { postId: id },
        update(proxy) {
            const data = proxy.readQuery({
                query: GET_POSTS,
                variables: {
                    userId // if it's undefined it's like passing an empty object
                }
            })
            const newData = data.posts.filter(p => p.id !== id)
            //telling apollo that i'm taking care of merging fields so it won't call error
            proxy.evict({
                fieldName: "posts",
                broadcast: false,
            });
            proxy.writeQuery({ query: GET_POSTS, variables: { userId }, data: { posts: newData } })
        },
        onError(err) {
            //TODO: HANDLE ERROR
            throw err
        }
    })

    const [areSure, setAreSure] = useState(false)

    const handleOnClick = (e) => {
        e.target.blur()
        setAreSure(true)
    }

    return (
        <>
            <StyledMenuButton onClick={handleOnClick} inactive={loading} className='postCard__button'>
                <FontAwesomeIcon icon={faTrash} />
                <p>Delete post</p>
            </StyledMenuButton>
            { areSure && 
            <AreYouSureBox 
            callback={deletePost} 
            close={() => setAreSure(false)}
            > Are you sure you wanna delete that post? </AreYouSureBox>}
        </>
    )
}

const StyledMenuButton = styled(MenuButton)`

&:hover, &:focus {
    color:${props => props.theme.errorColor};
}

`
