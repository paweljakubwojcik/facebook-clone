import React, { useContext, useState } from 'react'

import styled from 'styled-components'

import { AuthContext } from '../../Context/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { GenericButton, SquareButton } from '../General/Buttons'
import LikeButton from './LikeButton'
import CommentSection from './CommentSection/CommentSection'
import PostOptions from './PostOptions'
import Avatar from '../General/Avatar'

import TimeStamp from './TimeStamp'

import UserLink from './UserLink'
import LikesCounter from './LikesCounter'
import ImagesContainer from './ImagesContainer'
import PictureLink from '../General/PictureLink'

export default function PostContent({ post, noImages }) {

    const { body,
        createdAt,
        commentsCount,
        id,
        likesCount,
        comments,
        likes,
        isDeletable,
        user: { id: userId, username, profileImage },
        images,
    } = post

    const renderImages = !!images && !noImages


    const context = useContext(AuthContext)

    const initialCommentsVisibility = commentsCount > 3 ? false : true;
    const [commentsVisible, setCommentsVisibility] = useState(initialCommentsVisibility)
    const [commentInputFocus, setCommentInputFocus] = useState(false)

    const engageComment = () => {
        setCommentsVisibility(true)
        setCommentInputFocus(true)
    }

    return (
        <>

            <PostCardHeader className='postCard__header'>
                <Avatar image={profileImage?.urls?.small} />
                <header>
                    <h4>
                        <UserLink userId={userId}>{username}</UserLink>
                    </h4>
                    <TimeStamp time={createdAt} />
                </header>
                {context?.user?.username === username && <PostOptions postId={id} isDeletable={isDeletable} />}
            </PostCardHeader>

            <PostCardBody className='postCard__body'>
                {body}
            </PostCardBody>

            {renderImages && <ImagesContainer>{images.map(img => <PictureLink picture={img} key={img.id || img.name} />)}</ImagesContainer>}

            <PostCardCounters className='postCard__counters' >
                <LikesCounter likesCount={likesCount} likes={likes} />
                <GenericButton className="counter comments" onClick={() => setCommentsVisibility(!commentsVisible)}>
                    {commentsCount} {`Comment${commentsCount !== 1 ? 's' : ''}`}
                </GenericButton>
            </PostCardCounters>

            {
                context.user && (
                    <PostCardButtonsContainer>
                        <LikeButton postData={{ id, likes }} />
                        <SquareButton onClick={engageComment} className='postCard__button'>
                            <FontAwesomeIcon className="icon" icon={faComment} />Comment</SquareButton>
                    </PostCardButtonsContainer>
                )
            }

            {commentsVisible && <CommentSection comments={comments} postId={id} inputFocus={commentInputFocus} setFocus={setCommentInputFocus} />}

        </>
    )
}

//----------------------styles--------------------------
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




