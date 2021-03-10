import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'

import { SquareButton } from '../General/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { REACT } from '../../Util/GraphQL_Queries'

import ReactionPicker from './ReactionPicker'

export default function LikeButton({ postData }) {
    const { userId, isLogged } = useContext(AuthContext)
    const [liked, setLiked] = useState(false)
    const { id, reactions } = postData

    useEffect(() => {
        if (isLogged && reactions.find((like) => like.user.id === userId)) setLiked(true)
        else setLiked(false)
    }, [reactions, userId, isLogged])

    const [likePost, { loading }] = useMutation(REACT, {
        variables: { id },
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
        <ReactionPicker.Container style={{ display: 'flex' }}>
            <ReactionPicker />
            <SquareButton
                onClick={handleOnClick}
                inactive={loading}
                active={liked}
                style={{ flex: 1 }}
            >
                <FontAwesomeIcon className="icon" icon={faThumbsUp} />
                {liked ? 'Liked !' : 'Like !'}
            </SquareButton>
        </ReactionPicker.Container>
    )
}
