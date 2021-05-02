import React, { useContext } from 'react'
import styled from 'styled-components'

import { MessengerContext } from '../../Context/messenger'
import { useQuery } from '@apollo/client'
import { GET_MINIFIED_CONVERSATION } from '../../Util/GraphQL_Queries/Conversation_queries'
import Avatar from '../General/Avatar'

export default function MinimalizedChat({ chatId, ...rest }) {
    const { maximalizeChat, removeChat } = useContext(MessengerContext)

    const { data: { conversation: { image } = {} } = {}, error, loading } = useQuery(
        GET_MINIFIED_CONVERSATION,
        {
            variables: {
                id: chatId,
            },
            onError: (e) => {
                console.log(e)
            },
        }
    )

    return (
        <Container onClick={() => maximalizeChat(chatId)}>
            <Avatar image={image?.urls?.small} size={50} />
        </Container>
    )
}

const Container = styled.div`
    margin: 0.5em auto;
    cursor: pointer;
`
