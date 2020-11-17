import React, { useContext } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useQuery, gql } from '@apollo/client'

import Avatar from '../General/Avatar'
import { GenericButton, SquareButton } from '../General/Buttons'
import PostOptions from './PostOptions'
import { AuthContext } from '../../Context/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons'
import LikeButton from './LikeButton'

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

export default function PostCard({ post }) {




    const { body, createdAt, commentsCount, id, likesCount, username, comments, likes, user } = post
    const context = useContext(AuthContext)
    console.log(user)

    const { loading, data: { getUser: { profileImage } = {} } = {} } = useQuery(GET_USER_PIC, {
        variables: {
            userId: user
        }
    })

    return (
        <PostCardContainer className='postCard'>
            <PostCardHeader className='postCard__header'>
                <Avatar image={profileImage?.medium} />
                <header>
                    <h4>{username}</h4>
                    <div className="timestamp">
                        {moment(createdAt).fromNow()}
                    </div>
                </header>
                {context?.user?.username === username && <PostOptions postId={id} />}
            </PostCardHeader>

            <PostCardBody className='postCard__body'>
                {body}
            </PostCardBody>

            <PostCardCounters className='postCard__counters' >
                <div className="counter likes">
                    <FontAwesomeIcon className="icon" icon={faThumbsUp} />
                    {likesCount}
                </div>
                <GenericButton className="counter comments">
                    {commentsCount} Comments
                </GenericButton>
                <GenericButton className="counter shares">
                    0 Shares
                </GenericButton>
            </PostCardCounters>

            <PostCardButtonsContainer>
                <LikeButton postData={{ id, likes }} />
                <SquareButton className='postCard__button'>
                    <FontAwesomeIcon className="icon" icon={faComment} />
                   Comment
                </SquareButton>
                <SquareButton className='postCard__button'>
                    <FontAwesomeIcon className="icon" icon={faShare} />
                    Share
                </SquareButton>
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
    @media (max-width:600px){
        border-radius:0;
    }
`
export const PostCardHeader = styled.div`
position:relative;
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
    & > * {
        flex:1;
    }
`

