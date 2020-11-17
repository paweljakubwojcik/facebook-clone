import React from 'react'
import { useMutation } from '@apollo/client'

import { SquareButton } from '../General/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { DELETE_POST, GET_POSTS } from '../../Util/GraphQL_Queries'

export default function DeleteButton({ postId }) {
    const id = postId

    const [deletePost, { loading }] = useMutation(DELETE_POST, {
        variables: { postId: id },
        update(proxy) {
            const data = proxy.readQuery({
                query: GET_POSTS,
            })
            const newData = data.getPosts.filter(p => p.id !== id)
            proxy.writeQuery({ query: GET_POSTS, data: { getPosts: newData } })
        },
        onError(err) {
            console.log(err)
        }
    })

    const handleOnClick = (e) => {
        e.target.blur()
        deletePost()
    }

    return (
        <SquareButton onClick={handleOnClick} inactive={loading} className='postCard__button'>
            <FontAwesomeIcon icon={faTrash} />
            Delete post
        </SquareButton>
    )
}
