import { useMutation, useQuery } from '@apollo/client'
import React, { forwardRef, useContext, useState } from 'react'
import { GET_CONVERSATIONS, MARK_LAST_MESSAGES_SEEN } from '../../Util/GraphQL_Queries'
import DotLoader from '../General/DotLoader'
import DropDownMenu from '../General/DropDownMenu'
import NotFound from '../General/NotFound'
import styled from 'styled-components'
import { AuthContext } from '../../Context/auth'
import ListElement from './ListElement'
import Avatar from '../General/Avatar'
import { MessengerContext } from '../../Context/messenger'
import { useIntersectionObserver } from '../../Util/Hooks/useIntersectionObserver'
import SkeletonUserButton from '../skeletons/SkeletonUserButton'
import ErrorMessage from '../General/ErrorMessage'

const limit = 2

export default forwardRef(function Messages({ visible }, ref) {
    const { userId } = useContext(AuthContext)

    const {
        data: { user: { conversations } = {} } = {},
        loading,
        error,
        fetchMore,
    } = useQuery(GET_CONVERSATIONS, {
        variables: {
            limit,
            sort: 'DESCENDING',
            sortBy: 'newestMessageTimestamp',
            userId,
        },
    })

    const [canFetchMore, setCanFetchMore] = useState(true)

    const handleFetchMore = async () => {
        const {
            data: {
                user: { conversations: newConversations },
            },
        } = await fetchMore({
            variables: {
                cursor: conversations.length
                    ? conversations[conversations.length - 1].id
                    : undefined,
            },
        })
        if (newConversations.length < limit) setCanFetchMore(false)
    }

    const { setRef, setRoot } = useIntersectionObserver(
        {
            threshold: 0.7,
        },
        handleFetchMore
    )

    console.log(conversations)

    /* useEffect(() => {
        if (count > notifsCount) {
            refetch()
            setNotifCount(count)
        }
        if (count < notifsCount) {
            const isSuccesful = client.cache.modify({
                id: `User:${userId}`,
                fields: {
                    notifications: () => [],
                },
            })
            if (!isSuccesful) console.warn(`could not modify cache on object User:${userId}`)
            refetch({
                limit: notifications.length,
            })
            setNotifCount(count)
        }
    }, [count, refetch, client, userId, notifsCount, notifications]) */

    if (!visible) return null

    return (
        <DropDownMenu ref={ref}>
            <Container ref={setRoot}>
                {loading && <DotLoader style={{ margin: '2em', width: '10em' }} />}
                {error && (
                    <>
                        <NotFound message={'Something went wrong'} />
                        <ErrorMessage>{error.message}</ErrorMessage>
                    </>
                )}
                {conversations &&
                    conversations.map((conversation) => (
                        <ConversationElement data={conversation} key={conversation.id} />
                    ))}
                {!loading && !error && canFetchMore && (
                    <div ref={setRef}>
                        <SkeletonUserButton />
                        <SkeletonUserButton />
                    </div>
                )}
            </Container>
        </DropDownMenu>
    )
})

const ConversationElement = ({ data }) => {
    const { addChat } = useContext(MessengerContext)
    const { userId } = useContext(AuthContext)

    const [markLastMessagesSeen] = useMutation(MARK_LAST_MESSAGES_SEEN, {
        variables: {
            conversationId: data.id,
        },
        onCompleted: (data) => {
            console.log(data)
        },
        onError: (e) => {
            console.log(e)
        },
    })

    const handleClick = () => {
        addChat(data.id)
        markLastMessagesSeen()
    }

    return (
        <ListElement
            isSeen={data.messages[0].seenBy.map((o) => o.id).includes(userId)}
            handleClick={handleClick}
            markSeen={markLastMessagesSeen}
        >
            <Avatar image={data.image.urls.small} />
            <ListElement.ContentContainer>
                <ListElement.Title>{data.name}</ListElement.Title>
                <ListElement.Body>{data.messages[0]?.body}</ListElement.Body>
                <ListElement.Timestamp isSeen={data.isSeen}>
                    {data.newestMessageTimestamp}
                </ListElement.Timestamp>
            </ListElement.ContentContainer>
        </ListElement>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 18em;
    border-radius: inherit;
    overflow: hidden;
    max-height: 60vh;
    overflow-y: auto;

    ${(props) => props.theme.scrollBar}
`
