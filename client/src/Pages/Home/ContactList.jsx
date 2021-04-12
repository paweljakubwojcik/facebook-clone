import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import UserButton from '../../Components/General/UserButton'
import SkeletonUserButton from '../../Components/skeletons/SkeletonUserButton'
import ErrorMessage from '../../Components/General/ErrorMessage'

import { GET_FRIENDS } from '../../Util/GraphQL_Queries'
import { AuthContext } from '../../Context/auth'

export default function ContactList() {
    const { userId } = useContext(AuthContext)

    const { loading, error, data: { user: { friends } = {} } = {} } = useQuery(GET_FRIENDS, {
        variables: {
            userId,
        },
    })

    return (
        <Container>
            <ScrollWrapper>
                <h2>Contacts</h2>
                {friends && friends.map((user) => <UserButton key={user.id} user={user} />)}
                {loading && [0, 1, 2, 3].map((key) => <SkeletonUserButton key={key} />)}
                {error && <ErrorMessage>{"Couldn't find any friends"}</ErrorMessage>}
            </ScrollWrapper>
        </Container>
    )
}

const Container = styled.div`
    grid-area: right;
    justify-self: right;
    position: sticky;
    top: var(--navbar-height);

    margin: 0 1%;

    width: 300px;
    height: calc(100vh - var(--navbar-height));
    display: flex;
    flex-direction: column;
    overflow-x: visible;

    h2 {
        padding: 0.5em 0;
        width: 100%;
        color: ${(props) => props.theme.secondaryFontColor};
        border-bottom: solid 1px ${(props) => props.theme.secondaryFontColor};
    }
    & > * {
        margin: 0.2em;
        flex-shrink: 0;
    }
`
//This componenet is responsible for scroll behaviour only, notice it is positioned static - because in order to
//allow child elements to overflow it, they have to be positoned relative to container that doesn't have overflow:scroll,
//so child elements are positioned relative to Container wchich has property overflow-x set to visible
const ScrollWrapper = styled.div`
    overflow-y: auto; /* Just apply overflow-y */
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    > * {
        margin: 0.2em;
        flex-shrink: 0;
    }

    ${(props) => props.theme.scrollBar}
`
