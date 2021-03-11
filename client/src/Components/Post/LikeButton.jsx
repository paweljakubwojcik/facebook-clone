import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'

import { SquareButton } from '../General/Buttons'

import { REACT } from '../../Util/GraphQL_Queries'

import ReactionPicker from './ReactionPicker'
import icons from '../../Util/Constants/reactionsIcons'

export default function LikeButton({ data, customButton }) {
    const { userId, isLogged } = useContext(AuthContext)
    const [reaction, setReaction] = useState(null)
    const { id, reactions } = data
    const [pickerVisible, setPicker] = useState(false)

    useEffect(() => {
        const foundReaction = reactions.find((like) => like.user.id === userId)
        if (isLogged && foundReaction) setReaction(foundReaction.type)
        else setReaction(null)
    }, [reactions, userId, isLogged])

    const [reactToThis, { loading }] = useMutation(REACT, {
        variables: { id },
        onError(err) {
            console.log(err)
        },
    })

    const react = (type) => {
        reactToThis({
            variables: {
                type: type,
            },
        })
    }

    const Reaction = icons[reaction ? reaction : 'LIKE']

    const Button = customButton ? customButton : SquareButton

    return (
        <ReactionPicker.Container
            style={{ display: 'flex' }}
            onMouseEnter={() => setPicker(true)}
            onMouseLeave={() => setPicker(false)}
        >
            <ReactionPicker react={react} isVisible={pickerVisible} />
            <Button
                onClick={() => react(reaction ? reaction : 'LIKE')}
                inactive={loading}
                active={!!reaction}
                style={{ flex: 1, padding: 0, margin: 0 }}
            >
                <Reaction style={{ width: '1em', height: '1em' }} />
                {reaction ? reaction.slice(0, 1) + reaction.slice(1).toLowerCase() : 'Like !'}
            </Button>
        </ReactionPicker.Container>
    )
}
