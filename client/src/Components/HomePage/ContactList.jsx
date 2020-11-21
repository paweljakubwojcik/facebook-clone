import React from 'react'
import { useQuery } from '@apollo/client';
import styled from 'styled-components'

import UserButton from '../General/UserButton'
import SkeletonUserButton from '../skeletons/SkeletonUserButton'

import { GET_USERS } from '../../Util/GraphQL_Queries'




export default function ContactList() {

    const { loading, error, data: { getUsers: users } = {} } = useQuery(GET_USERS);

    return (

        <Container>
            <ScrollWrapper>
                <h2>Kontakty</h2>
                {users && users.map(user => <UserButton key={user.id} user={user} />)}
                {[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(key => <SkeletonUserButton key={key} />)}
            </ScrollWrapper>
        </Container>
    )
}


const Container = styled.div`
    position:fixed;
    right:1%;
    width:300px;
    height:92vh;
    display:flex;
    flex-direction:column;
    overflow-x:visible;
    
    h2{
        padding: .5em 0;
        width:100%;
        color: ${props => props.theme.secondaryFontColor};
        border-bottom: solid 1px ${props => props.theme.secondaryFontColor};
    }
    & > * {
        margin: .2em;
        flex-shrink:0;
    }

    @media (max-width:1260px){
        display:none;
    }

`

const ScrollWrapper = styled.div`
    overflow-y: auto;   /* Just apply overflow-y */
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    > * {
        margin: .2em;
        flex-shrink:0;
    }
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
