import React from 'react'
import styled from 'styled-components'

import { PostCardContainer } from './PostCard'
import Avatar from './Avatar'



export default function Status() {
    return (
        <Container className='status__container'>
            <Avatar className="status__avatar"></Avatar>
            <StatusInput className='status__input' type="text" />
        </Container>
    )
}

const Container = styled(PostCardContainer)`
    display:flex;
`

const StatusInput = styled.input`
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