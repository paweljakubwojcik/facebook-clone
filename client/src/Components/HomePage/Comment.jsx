import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
//import { GET_USER_PIC } from '../../Util/GraphQL_Queries'

import Avatar from '../General/Avatar'

export default function Comment({ comment }) {


    const { data: { getUser: { profileImage, username } = {} } = {} } = useQuery(GET_USER_PIC, {
        variables: {
            userId: comment.user
        }
    })

    return (
        <Container>
            <Avatar image={profileImage?.medium} />
            <CommentBody>
                <h4>{username}</h4>
                {comment.body}
            </CommentBody>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    align-items:flex-start;
    margin: 1em 0;
    font-size:.8em;
`

const CommentBody = styled.div`
    margin:0em 1em;
    
    padding:.5em;
    border-radius:.5em;
    background-color: ${props => props.theme.roundButtonColor};

`

const GET_USER_PIC = gql`
query getUser(  $userId: ID! ){
 getUser( userId: $userId,) {
    id
    username
    profileImage{
        medium
    }
    }
}
`