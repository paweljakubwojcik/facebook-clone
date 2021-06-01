import React, { forwardRef, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../Context/auth'
import { gql, useMutation, useQuery } from '@apollo/client'
import { replaceJSX } from '../../Util/Methods'
import { useHistory } from 'react-router-dom'
import { MARK_SEEN, GET_NOTIFICATIONS } from '../../Util/GraphQL_Queries'

import DotLoader from '../General/DotLoader'
import DropDownMenu from '../General/DropDownMenu'
import Avatar from '../General/Avatar'
import NotFound from '../General/NotFound'
import AnswerToInvitation from '../General/ActionButtons/AnswerToInvitation'
import ListElement, { ElementContainer } from './ListElement'
import { useIntersectionObserver } from '../../Util/Hooks/useIntersectionObserver'

const limit = 8

const Notifications = forwardRef(({ count, visible, ...rest }, ref) => {
    const [canFetchMore, setCanFetchMore] = useState(true)
    const [notifsCount, setNotifCount] = useState(0)

    const { userId } = useContext(AuthContext)

    const {
        data: { user: { notifications } = {} } = {},
        loading,
        error,
        fetchMore,
        refetch,
        client,
    } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            limit,
            sort: 'DESCENDING',
            sortBy: 'timestamp',
            userId,
        },
        onError: (e) => {
            throw e
        },
    })

    const handleFetchMore = async (e) => {
        if (!loading && !error && canFetchMore) {
            console.log('fetch')
            const {
                data: {
                    user: { notifications: newNotifications },
                },
            } = await fetchMore({
                variables: {
                    cursor: notifications.length
                        ? notifications[notifications.length - 1].id
                        : undefined,
                },
            })
            if (newNotifications.length < limit) setCanFetchMore(false)
        }
    }

    const { setRef, setRoot } = useIntersectionObserver(
        {
            threshold: 0.7,
        },
        handleFetchMore
    )

    useEffect(() => {
        if (count > notifsCount) {
            refetch()
            setNotifCount(count)
        }
        // this is in case notifications gets erased after user has seen it
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
    }, [count, refetch, client, userId, notifsCount, notifications])

    if (!visible) return null

    return (
        <DropDownMenu {...rest} ref={ref}>
            <Container ref={setRoot}>
                {loading && <DotLoader style={{ margin: '2em', width: '10em' }} />}
                {error && <NotFound message={'Something went wrong'} />}
                {notifications && (
                    <>
                        {notifications.map((notification) => (
                            <Notification data={notification} key={notification.id} />
                        ))}
                        {!loading && !error && canFetchMore && (
                            <ElementContainer
                                ref={setRef}
                                style={{ pointerEvents: 'none' }}
                            ></ElementContainer>
                        )}
                        {!loading && !error && !canFetchMore && (
                            <ElementContainer style={{ pointerEvents: 'none' }}>
                                no more notifications today ;/
                            </ElementContainer>
                        )}
                    </>
                )}
            </Container>
        </DropDownMenu>
    )
})

export default Notifications

const Notification = ({ data, buttons }) => {
    const [markSeen] = useMutation(MARK_SEEN, {
        variables: {
            notificationId: data.id,
        },
        onError: (e) => console.log(e),
        update: (cache) => {
            cache.writeFragment({
                id: `Notification:${data.id}`,
                fragment: gql`
                    fragment MyNotification on Notification {
                        id
                        isSeen
                    }
                `,
                data: {
                    isSeen: true,
                },
            })
        },
    })

    const history = useHistory()

    const handleClick = () => {
        markSeen()

        history.push(`/profile/${data.from?.id}`)
    }

    return (
        <ListElement isSeen={data.isSeen} handleClick={handleClick} markSeen={markSeen}>
            <Avatar image={data.from?.profileImage?.urls?.small} />
            <ListElement.ContentContainer>
                <ListElement.Body>
                    {replaceJSX(data.body, `$user`, <b>{data.from?.username}</b>)}
                </ListElement.Body>
                <ListElement.Timestamp isSeen={data.isSeen}>{data.timestamp}</ListElement.Timestamp>
                {data.type === 'INVITATION' && (
                    <ListElement.Buttons>
                        <AnswerToInvitation from={data.from.id} />
                    </ListElement.Buttons>
                )}
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
