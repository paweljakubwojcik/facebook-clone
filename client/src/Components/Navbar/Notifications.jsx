import React, { forwardRef, useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../Context/auth'
import { gql, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'

import DotLoader from '../General/DotLoader'
import DropDownMenu from '../General/DropDownMenu'
import Avatar from '../General/Avatar'
import NotFound from '../General/NotFound'
import AnswerToInvitation from '../General/ActionButtons/AnswerToInvitation'
import { replaceJSX } from '../../Util/Methods'
import { Link, useHistory } from 'react-router-dom'
import { MARK_SEEN } from '../../Util/GraphQL_Queries'

const GET_NOTIFICATIONS = gql`
    query getUset($userId:ID!){
        getUser(userId:$userId){
            id
            notifications{
                body
                id
                createdAt
                isSeen
                from{
                    id
                    username
                    profileImage{
                        urls{
                            id
                            small
                        }
                    }
                }
            }
            invitations{
                from{
                    id
                    username
                    profileImage{
                        urls{
                            id
                            small
                        }
                    }
                }
                id
                date
            }
        }
    }

`



const Notifications = forwardRef(({ userId, toggleActive, ...rest }, ref) => {

    const { user } = useContext(AuthContext)

    const { data: { getUser } = {}, loading, error } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            userId: user.id
        }
    })

    const notifications = getUser?.notifications.map(notification =>
        <Notification
            notification={notification}
            key={notification.id}
            date={notification.createdAt}
            toggleActive={toggleActive}
        />)

    const invitations = getUser?.invitations.map(invitation =>
        <Invitation
            invitation={invitation}
            key={invitation.id}
            date={invitation.date}
            toggleActive={toggleActive}
        />)


    return (
        <DropDownMenu {...rest} ref={ref}>
            <Container>
                {loading && <DotLoader style={{ margin: '2em', width: '10em' }} />}
                {getUser && [...notifications, ...invitations]}
                {error && <NotFound message={'Something went wrong'} />}
            </Container>
        </DropDownMenu>
    )
})

export default Notifications


const Notification = ({ notification, date, toggleActive }) => {
    return (
        <Content data={notification} date={date} toggleActive={toggleActive}>
            {notification.body}
        </Content>
    )
}
const Invitation = ({ invitation, date, toggleActive }) => {
    return (
        <Content data={invitation} date={date} buttons={<AnswerToInvitation from={invitation.from?.id} />} toggleActive={toggleActive}>
            {`${invitation.from?.username} wants to become your friend !`}
        </Content>
    )
}

const Content = ({ data, children, date, buttons, toggleActive }) => {

    const [markSeen] = useMutation(MARK_SEEN, {
        variables: {
            notificationId: data.id
        }
    })

    const history = useHistory()

    const handleClick = () => {
        markSeen()
        history.push(`/profile/${data.from?.id}`)
        toggleActive('')
    }

    return (
        <div style={{ position: 'relative' }}>
            <ElementContainer isSeen={data.isSeen} onClick={handleClick}>
                <Avatar image={data.from?.profileImage?.urls?.small} />
                <ContentContainer>
                    <Title>
                        {replaceJSX(children, `$user`, <b>{data.from?.username}</b>)}
                    </Title>
                    <Timestamp isSeen={data.isSeen}>{moment(date).fromNow()}</Timestamp>
                    <Buttons>{buttons}</Buttons>
                </ContentContainer>

            </ElementContainer>
            {!data.isSeen && <NotSeenIndicator onClick={markSeen} />}
        </div>
    )
}



const Container = styled.div`

    display:flex;
    flex-direction:column;
    align-items:stretch;
    width:15em;
    border-radius:inherit;
    overflow:hidden;
    max-height:60vh;
    overflow-y:auto;

    /* ScrollBar styling here */
    scrollbar-width: thin;          /* "auto" or "thin"  */
    scrollbar-color: ${props => props.theme.secondaryFontColor} ${props => props.theme.primaryElementColor};   /* scroll thumb & track */

        &::-webkit-scrollbar {
        width: 12px;
        }
        &::-webkit-scrollbar-track {
        background:${props => props.theme.primaryElementColor};
        }
        &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.secondaryFontColor};
        border-radius: 20px;
        }
   
`

const ContentContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin: 0 1em 0 .6em;
    
`

const ElementContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:left;
    align-items:start;
    padding: 1em .5em;
    color: ${props => props.theme.primaryFontColor};
    filter:contrast(${props => props.isSeen ? '.7' : '1'});
    border-bottom: solid 1px ${props => props.theme.borderColor};
    &:hover{
        cursor: pointer;
        background-color: ${props => props.theme.activeButtonColor};
    }
`

const Buttons = styled.div`
    font-size:.7em;
    display:flex;

`

const Title = styled.div`
    font-size: .7em;

`

const Timestamp = styled.p`
    font-size: .5em;
    color: ${props => props.isSeen ? props.theme.secondaryFontColor : props.theme.primaryColor};

`

const NotSeenIndicator = styled.div`

    position:absolute;
    right:.5em;
    top:50%;
    display:block;
    width:.8em;
    height:.8em;
    border-radius:50%;
    transform: translateY(-50%);
    background-color:${props => props.theme.primaryColor};
    transition: transform .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &:hover,
    &:focus{
        cursor:pointer;
        transform: translateY(-50%) scale(1.3);
    }

`
