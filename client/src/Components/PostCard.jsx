import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import Avatar from './Avatar'

export default function PostCard({ post }) {
    const { body, createdAt, commentsCount, id, likesCount, username, comments, likes } = post


    return (
        <PostCardContainer className='postCard'>
            <PostCardHeader className='postCard__header'>
                <Avatar />
                <header>
                    <h4>{username}</h4>
                    <p className="timestamp">
                        {moment(createdAt).fromNow()}
                    </p>
                </header>
            </PostCardHeader>
            <PostCardBody className='postCard__body'>
                {body}
            </PostCardBody>
        </PostCardContainer>
    )
}

export const PostCardContainer = styled.div`
    width:100%;
    background-color:${props => props.theme.primaryElementColor};
    border-radius:.5em;
    margin: 2vh 2%;
    padding:1em;
`

export const PostCardHeader = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    header{
        display:flex;
        flex-direction:column;
        justify-content:center;
        margin:  0 .5em;
        p{
            font-size:.7em;
            color:${props => props.theme.secondaryFontColor};
        }
    }
`
export const PostCardBody = styled.div`
    width:100%;
    margin: 1em 0;
    padding: 0 .2em;
`