import React, { forwardRef } from 'react'
import styled from 'styled-components'

import { gql, useMutation, useQuery } from '@apollo/client'
import { replaceJSX } from '../../Util/Methods'
import { useHistory } from 'react-router-dom'
import { MARK_SEEN } from '../../Util/GraphQL_Queries'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DotLoader from '../General/DotLoader'
import DropDownMenu from '../General/DropDownMenu'
import Avatar from '../General/Avatar'
import NotFound from '../General/NotFound'
import AnswerToInvitation from '../General/ActionButtons/AnswerToInvitation'

dayjs.extend(relativeTime)

const GET_NOTIFICATIONS = gql`
    query notifications($limit: Int!, $offset: Int!) {
        notifications(limit: $limit, offset: $offset) {
            id
            notifications {
                body
                id
                createdAt
                timestamp
                isSeen
                from {
                    id
                    username
                    profileImage {
                        urls {
                            id
                            small
                        }
                    }
                }
            }
        }
    }
`

const limit = 7

const Notifications = forwardRef(({ userId, ...rest }, ref) => {
    const { data: { notifications: fetchedUser } = {}, loading, error, fetchMore } = useQuery(
        GET_NOTIFICATIONS,
        {
            variables: {
                limit,
                offset: 0,
            },
            onError: (e) => {
                throw e
            },
            onCompleted: (data) => console.log(data),
        }
    )

    const notifications = fetchedUser?.notifications?.map((notification) => (
        <Notification data={notification} key={notification.id} date={notification.createdAt} />
    ))

    const handleScroll = (e) => {
        const { scrollTop, scrollTopMax } = e.target
        if (scrollTop === scrollTopMax)
            fetchMore({
                variables: {
                    offset: notifications.length,
                },
            })
    }

    return (
        <DropDownMenu {...rest} ref={ref}>
            <Container onScroll={handleScroll}>
                {loading && <DotLoader style={{ margin: '2em', width: '10em' }} />}
                {error && <NotFound message={'Something went wrong'} />}
                {notifications && notifications}
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
        <div style={{ position: 'relative' }}>
            <ElementContainer isSeen={data.isSeen} onClick={handleClick}>
                <Avatar image={data.from?.profileImage?.urls?.small} />
                <ContentContainer>
                    <Title>{replaceJSX(data.body, `$user`, <b>{data.from?.username}</b>)}</Title>
                     <Timestamp isSeen={data.isSeen}>{dayjs(data.timestamp).fromNow()}</Timestamp>
                    {buttons && <Buttons>{buttons}</Buttons>}
                </ContentContainer>
            </ElementContainer>
            {!data.isSeen && <NotSeenIndicator onClick={markSeen} />}
        </div>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 15em;
    border-radius: inherit;
    overflow: hidden;
    max-height: 60vh;
    overflow-y: auto;

    ${(props) => props.theme.scrollBar}
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1em 0 0.6em;
`

const ElementContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: start;
    padding: 1em 0.5em;
    color: ${(props) => props.theme.primaryFontColor};
    filter: contrast(${(props) => (props.isSeen ? '.7' : '1')});
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
    transition: background-color 0.2s;
    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.activeButtonColor};
    }
`

const Buttons = styled.div`
    font-size: 0.7em;
    display: flex;
`

const Title = styled.div`
    font-size: 0.7em;
`

const Timestamp = styled.p`
    font-size: 0.5em;
    color: ${(props) => (props.isSeen ? props.theme.secondaryFontColor : props.theme.primaryColor)};
`

const NotSeenIndicator = styled.div`
    position: absolute;
    right: 0.5em;
    top: 50%;
    display: block;
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.primaryColor};
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &:hover,
    &:focus {
        cursor: pointer;
        transform: translateY(-50%) scale(1.3);
    }
`
