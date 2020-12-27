import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import styled from 'styled-components'

import UserButton from '../General/UserButton'
import SkeletonUserButton from '../skeletons/SkeletonUserButton'
import ErrorMessage from '../General/ErrorMessage'

import { GET_USERS } from '../../Util/GraphQL_Queries'
import { useIntersectionObserver } from '../../Util/Hooks/useIntersectionObserver';


export default function ContactList() {

    const [setRef, visible] = useIntersectionObserver({
        threshold: .7
    })

    const [canFetchMore, setCanFetchMore] = useState(true)

    //it gets every user from database
    const { loading, error, data: { getUsers: users } = {}, fetchMore } = useQuery(GET_USERS, {
        variables: {
            offset: 0,
            limit: 10,
        }
    });

    async function handleIntersect() {

        fetchMore({
            variables: {
                offset: users.length || 0
            }
        }).then(({ data: { getUsers: newData } }) => {
            //when all posts have been fetched
            if (newData.length === 0)
                setCanFetchMore(false)
        })
    }

    useEffect(() => {
        if (visible)
            handleIntersect()
    }, [visible])

    return (

        <Container>
            <ScrollWrapper>
                <h2>Contacts</h2>
                {users && users.map(user => <UserButton key={user.id} user={user} />)}
                {loading && [0, 1, 2, 3].map(key => <SkeletonUserButton key={key} />)}
                {error && <ErrorMessage >{'Couldn\'t find any friends'}</ErrorMessage>}
                {!loading && !error && canFetchMore && <Dummy ref={setRef}> {[1, 2].map((key) => <SkeletonUserButton key={key} theme={'dark'} />)}</Dummy>}
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
//This componenet is responsible for scroll behaviour only, notice it is positioned static - because in order to 
//allow child elements to overflow it, they have to be positoned relative to container that doesn't have overflow:scroll,
//so child elements are positioned relative to Container wchich has property overflow-x set to visible
const ScrollWrapper = styled.div`
    overflow-y: auto;   /* Just apply overflow-y */
    overflow-x:hidden;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    > * {
        margin: .2em;
        flex-shrink:0;
    }

    /* ScrollBar styling here */
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

const Dummy = styled.div`

    display:flex;
    flex-direction:column;
    width:100%;
    background-color:transparent;

`
