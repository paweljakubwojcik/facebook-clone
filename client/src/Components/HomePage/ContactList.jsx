import React from 'react'
import styled from 'styled-components'
import UserButton from '../General/UserButton'

import { GET_USERS } from '../../Util/GraphQL_Queries'

import { useQuery } from '@apollo/client';



export default function ContactList() {

    const { loading, error, data: { getUsers: users } = {} } = useQuery(GET_USERS);

    return (
        <Container>
            <h2>Kontakty</h2>
            { users && users.map(user => <UserButton key={user.id} user={user} />)}
        </Container>
    )
}


const Container = styled.div`
    position:fixed;
    right:2%;
    width:300px;
    height:92vh;
    display:flex;
    flex-direction:column;
    
    h2{
        padding: .5em 0;
        width:100%;
        color: ${props => props.theme.secondaryFontColor};
        border-bottom: solid 1px ${props => props.theme.secondaryFontColor};
    }
    & > * {
        margin: .2em;
    }

    @media (max-width:1260px){
        display:none;
    }
    overflow-x:visible;
    scrollbar-width: thin;          /* "auto" or "thin"  */
    scrollbar-color: ${props => props.theme.secondaryFontColor} ${props => props.theme.primaryElementColor};   /* scroll thumb & track */

        &::-webkit-scrollbar {
        width: 12px;
        }
        &::-webkit-scrollbar-track {
        background:${props => props.theme.primaryElementColor};
        }
        &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.secondaryFontColor};
        border-radius: 20px;
        }

`