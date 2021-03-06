import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import ElementContainer from '../../Components/General/ElementContainer'
import Avatar from '../../Components/General/Avatar'

import { useCurrentUser } from '../../Util/Hooks/useCurrentUser'
import PostFormContainer from './PostForm/PostFormContainer'

export default function Status() {
    const { user: { username, profileImage } = {} } = useCurrentUser()

    const [isFormOpen, toggleForm] = useState(false)

    const handleOnclick = () => {
        toggleForm(true)
    }

    return (
        <>
            <ElementContainer>
                <Container>
                    <Avatar image={profileImage?.urls?.small}></Avatar>
                    <StatusInput type="text" onClick={handleOnclick} role="button">
                        O czym myślisz {username}?
                    </StatusInput>
                </Container>
            </ElementContainer>
            {isFormOpen && <PostFormContainer toggleForm={toggleForm}></PostFormContainer>}
        </>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const StatusInput = styled.button`
    text-align: left;
    font-size: 1em;
    flex: 1;
    margin: 0.5em;
    border-radius: 1em;
    padding: 0.5em 1em;
    box-shadow: none;
    border: none;
    font-family: inherit;
    background-color: ${(props) => props.theme.secondaryElementColor};
    color: ${(props) => props.theme.primaryFontColor};
    filter: opacity(0.8);
    transition: background-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s;
    &:focus {
        filter: opacity(1);
    }
    &:hover {
        background-color: ${(props) => props.theme.secondaryElementHover};
        filter: opacity(1);
        cursor: pointer;
    }
`
