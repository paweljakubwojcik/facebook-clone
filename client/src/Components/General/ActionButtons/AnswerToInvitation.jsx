
import React from 'react'

import {  useMutation } from '@apollo/client'

import {  ANSWER_INVITATION } from '../../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { FilledButton } from '../Buttons'
import DotLoader from '../DotLoader'

export default function AnswerToInvitation({ from }) {

    const [answerToInvitation, { loading }] = useMutation(ANSWER_INVITATION, {
        update: (cache, data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleAnswer = (answer) => {
        answerToInvitation({
            variables: {
                from,
                answer
            }
        })
    }

    return (
        loading ?
            <DotLoader style={{ fontSize: '.6em' }} />
            :
            <>
                <FilledButton onClick={() => handleAnswer('ACCEPT')}>

                    <FontAwesomeIcon icon={faCheck} />
                    <span>Accept</span>

                </FilledButton>
                <FilledButton red onClick={() => handleAnswer('DECLINE')}>

                    <FontAwesomeIcon icon={faTimes} />
                    <span>Decline</span>
                </FilledButton>
            </>

    )
}