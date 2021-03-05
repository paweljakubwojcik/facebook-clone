import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'

import { SquareButton } from '../General/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { LIKE_POST } from '../../Util/GraphQL_Queries'

export default function LikeButton({ postData }) {
    const { user } = useContext(AuthContext)
    const [liked, setLiked] = useState(false)
    const { id, reactions } = postData

    useEffect(() => {
        if (user && reactions.find((like) => like.user.id === user.id)) setLiked(true)
        else setLiked(false)
    }, [reactions, user])

    const [likePost, { loading }] = useMutation(LIKE_POST, {
        variables: { postId: id },
        onError(err) {
            console.log(err)
        },
    })

    const handleOnClick = (e) => {
        e.target.blur()
        likePost({
            variables: {
                type: 'LIKE',
            },
        })
    }

    return (
        <SquareButton
            onClick={handleOnClick}
            inactive={loading}
            active={liked}
        >
            <FontAwesomeIcon className="icon" icon={faThumbsUp} />
            {liked ? 'Liked !' : 'Like !'}
        </SquareButton>
    )
}
