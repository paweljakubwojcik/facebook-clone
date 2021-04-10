import React, { useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { DELETE } from '../../../Util/GraphQL_Queries'
import { AuthContext } from '../../../Context/auth'

import Avatar from '../../General/Avatar'
import { GenericButton } from '../../General/Buttons'
import UserLink from '../UserLink'
import LikesCounter from '../LikesCounter'
import LikeButton from '../LikeButton'
import TimeStamp from '../TimeStamp'
import PictureLink from '../../General/PictureLink'
import ImagesContainer from '../ImagesContainer'

export default function Comment({ comment, postId }) {
    const context = useContext(AuthContext)
    const { id: userId, username, profileImage } = comment.user

    const [deleteComment] = useMutation(DELETE, {
        variables: {
            id: comment.id,
        },
        update(cache, data) {
            cache.evict({ id: `Comment:${comment.id}` }) // the most simple way to cleanup cache
        },
    })

    const handleClick = (e, callback) => {
        e.target.blur()
        callback()
    }

    return (
        <Container>
            <Avatar image={profileImage?.urls.thumbnail} />
            <CommentBody>
                <header>
                    <h4>
                        <UserLink userId={userId}>{username}</UserLink>
                    </h4>
                    <TimeStamp time={comment.createdAt} style={{ margin: '.4em' }} />
                </header>
                <Body>
                    {comment.body}
                    {comment.images.length > 0 && (
                        <ImagesContainer
                            style={{
                                minWidth: '20em',
                                paddingTop: '1em',
                            }}
                        >
                            {comment.images.map((image) => (
                                <PictureLink picture={image} key={image.id} />
                            ))}
                        </ImagesContainer>
                    )}
                </Body>

                <Buttons blue={comment.reactionsCount > 0 ? 1 : 0}>
                    <LikeButton data={comment} customButton={GenericButton} />
                    {context?.userId === userId && (
                        <GenericButton
                            className="button"
                            onClick={(e) => handleClick(e, deleteComment)}
                        >
                            Delete
                        </GenericButton>
                    )}

                    <LikesCounter
                        className="likes"
                        reactionsCount={comment.reactionsCount}
                        reactions={comment.reactions}
                        style={{
                            position: 'absolute',
                            right: 0,
                        }}
                    />
                </Buttons>
            </CommentBody>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 1em 0;
    font-size: 0.8em;
    header {
        display: flex;
    }
    & > .avatar {
        flex-shrink: 0;
    }
`

const CommentBody = styled.div`
    min-width: 10em;
    margin: 0em 1em;
    margin-bottom: 1em;
    position: relative;
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: ${(props) => props.theme.roundButtonColor};
    word-wrap: break-word;
`

const Body = styled.div`
    margin: 0.5em 0;
`

const Buttons = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 0.85em;
    font-weight: bold;

    color: ${(props) => props.theme.secondaryFontColor};
    .button {
        padding: 0;
        margin: 0 2%;
    }

    .likes {
        padding: 0;
        margin: 0 2%;
        margin-right: auto;
        font-size: 0.9em;
    }
`

const Dot = styled.div`
    display: block;
    width: 3px;
    height: 3px;
    margin: 0.2em;
    background-color: ${(props) => props.theme.secondaryFontColor};
    border-radius: 50%;
`
