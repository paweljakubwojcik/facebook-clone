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

export default function PostContent({ post, noImages, onDeleteCallback }) {
    const {
        body,
        title,
        createdAt,
        privacy,
        commentsCount,
        id,
        reactionsCount,
        reactions,
        isDeletable,
        user: { id: userId, username, profileImage },
        images,
    } = post

    const renderImages = !!images && !noImages

    const context = useContext(AuthContext)

    const initialCommentsVisibility = commentsCount > 3 ? false : true
    const [commentsVisible, setCommentsVisibility] = useState(initialCommentsVisibility)
    const [commentInputFocus, setCommentInputFocus] = useState(false)

    const engageComment = () => {
        setCommentsVisibility(true)
        setCommentInputFocus(true)
    }

    return (
        <>
            <PostCardHeader>
                <Avatar image={profileImage?.urls?.small} />
                <header>
                    <h4>
                        <UserLink userId={userId} style={{ marginRight: '0.3em' }}>
                            {username}
                        </UserLink>
                        {title && <PostTitle>{title}</PostTitle>}
                    </h4>
                    <TimeStamp time={createdAt} />
                </header>
                {context.userId === userId && (
                    <PostOptions
                        post={{ privacy, id }}
                        isDeletable={isDeletable}
                        onDeleteCallback={onDeleteCallback}
                    />
                )}
            </PostCardHeader>

            <PostCardBody>{body}</PostCardBody>

            {renderImages && (
                <ImagesContainer>
                    {images.map((img) => (
                        <PictureLink picture={img} key={img.id || img.name} />
                    ))}
                </ImagesContainer>
            )}

            <PostCardCounters>
                <LikesCounter reactionsCount={reactionsCount} reactions={reactions} />
                <GenericButton
                    className="counter"
                    onClick={() => setCommentsVisibility(!commentsVisible)}
                >
                    {commentsCount} {`Comment${commentsCount !== 1 ? 's' : ''}`}
                </GenericButton>
            </PostCardCounters>

            {context.isLogged && (
                <PostCardButtonsContainer>
                    <LikeButton data={{ id, reactions }} />
                    <SquareButton onClick={engageComment}>
                        <FontAwesomeIcon className="icon" icon={faComment} />
                        Comment
                    </SquareButton>
                </PostCardButtonsContainer>
            )}

            {commentsVisible && (
                <CommentSection
                    postId={id}
                    inputFocus={commentInputFocus}
                    setFocus={setCommentInputFocus}
                    commentsCount={commentsCount}
                />
            )}
        </>
    )
}

//----------------------styles--------------------------
export const PostCardHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 0.5em;
    }
    h4 {
        display: flex;
        flex-wrap: wrap;
    }
`

const PostTitle = styled.div`
    font-weight: 300;
`

export const PostCardBody = styled.div`
    width: 100%;
    margin: 1em 0;
    padding: 0 0.2em;
`

const PostCardCounters = styled.div`
    display: flex;
    font-size: 0.6em;
    color: ${(props) => props.theme.secondaryFontColor};
    .counter {
        margin: 1em;
    }
`

const PostCardButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid ${(props) => props.theme.secondaryFontColor};
    border-top: 1px solid ${(props) => props.theme.secondaryFontColor};
    & > * {
        flex: 1;
    }
`
