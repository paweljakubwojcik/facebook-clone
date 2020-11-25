import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import ElementContainer from '../General/ElementContainer'
import Avatar from '../General/Avatar'
import PostForm from '../Post/PostForm'

import { AuthContext } from '../../Context/auth'


export default function Status() {

    const { user: { username } } = useContext(AuthContext)
    const profileImage = localStorage.getItem('avatar')

    const [isFormOpen, toggleForm] = useState(false)


    const handleOnclick = () => {
        toggleForm(true)
    }

    return (
        <ElementContainer>
            <Container className='status__container'>
                <Avatar image={profileImage} className="status__avatar"></Avatar>
                <StatusInput className='status__input' type="text" onClick={handleOnclick} > O czym myślisz {username}?</StatusInput>
                {isFormOpen && <PostForm toggleForm={toggleForm}></PostForm>}
            </Container>
        </ElementContainer>
    )
}

const Container = styled.div`
    display:flex;
    align-items:center;
    width:100%;
`

const StatusInput = styled.button`
    text-align:left;
    font-size:1em;
    flex:1;
    margin:.5em;
    border-radius:1em;
    padding:.5em 1em;
    box-shadow:none;
    border:none;
    font-family:inherit;
    background-color:${props => props.theme.secondaryElementColor};
    color:${props => props.theme.primaryFontColor};
    filter:brightness(.6);
    transition: filter .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:focus{
        filter:brightness(1);
    }
    &:hover{
        filter:brightness(1.1);
        cursor:pointer;
    }
`