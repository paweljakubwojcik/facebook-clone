import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import Avatar from './Avatar'
import Button from './Button'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons'

export default function PostCard({ post }) {
    const { body, createdAt, commentsCount, id, likesCount, username, comments, likes } = post


    return (
        <PostCardContainer className='postCard'>
            <PostCardHeader className='postCard__header'>
                <Avatar />
                <header>
                    <h4>{username}</h4>
                    <div className="timestamp">
                        {moment(createdAt).fromNow()}
                    </div>
                </header>
            </PostCardHeader>

            <PostCardBody className='postCard__body'>
                {body}
            </PostCardBody>

            <PostCardCounters className='postCard__counters' >
                <div className="counter likes">
                    <FontAwesomeIcon className="icon" icon={faThumbsUp} />
                    {likesCount}
                </div>
                <Button className="counter comments">
                    {commentsCount} Comments
                </Button>
                <Button className="counter shares">
                    0 Shares
                </Button>
            </PostCardCounters>

            <PostCardButtonsContainer>
                <ActionButton className='postCard__button'>
                    <FontAwesomeIcon className="icon" icon={faThumbsUp} />
                    Like!
                </ActionButton>
                <ActionButton className='postCard__button'>
                    <FontAwesomeIcon className="icon" icon={faComment} />
                   Comment
                </ActionButton>
                <ActionButton className='postCard__button'>
                    <FontAwesomeIcon className="icon" icon={faShare} />
                    Share
                </ActionButton>
            </PostCardButtonsContainer>

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
        .timestamp{
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

const PostCardCounters = styled.div`
    display:flex;
    font-size:.6em;
    color:${props => props.theme.secondaryFontColor};
    .counter{
        margin:1em;
    }
    .counter.likes{
        margin-right:auto;
        .icon{
            color:${props => props.theme.primaryColor};
            margin:0  0.5em;
        }
    }
`

const PostCardButtonsContainer = styled.div`
    display:flex;
    justify-content:space-evenly;
    border-bottom: 1px solid ${props => props.theme.secondaryFontColor};
    border-top: 1px solid ${props => props.theme.secondaryFontColor};
`

const ActionButton = styled(Button)`
    flex:1;
    .icon{
        margin:.5em;
    }
`