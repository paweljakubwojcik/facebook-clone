import React, { forwardRef, useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../Context/auth'
import { gql, useQuery } from '@apollo/client'
import moment from 'moment'

import DotLoader from '../General/DotLoader'
import DropDownMenu from '../General/DropDownMenu'
import Avatar from '../General/Avatar'


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

const Notifications = forwardRef(({ userId, ...rest }, ref) => {

    const { user } = useContext(AuthContext)

    const { data: { getUser } = {}, loading, error } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            userId: user.id
        }
    })

    console.log(getUser)

    const notifications = getUser?.notifications.map(notification => <Notification notification={notification} key={notification.id} date={notification.createdAt} />)
    const invitations = getUser?.invitations.map(invitation => <Invitation invitation={invitation} key={invitation.id} date={invitation.date} />)

    return (
        <DropDownMenu {...rest} ref={ref}>
            <Container>
                {loading && <DotLoader style={{ margin: '2em', width: '10em' }} />}
                {getUser && [...notifications, ...invitations].sort(({ props: { date: a } }, { props: { date: b } }) => moment(b).date() - moment(a).date())}
            </Container>
        </DropDownMenu>
    )
})


export default Notifications

const Notification = ({ notification, date }) => {
    return (
        <Content data={notification} date={date}>
            {notification.body}
        </Content>
    )
}
const Invitation = ({ invitation, date }) => {
    return (
        <Content data={invitation} date={date}>
            {`${invitation.from.username} wants to be your fake friend!`}
        </Content>
    )
}

const Content = ({ data, children, date }) => {
    return (
        <ElementContainer isSeen={data.isSeen}>
            <Avatar image={data.from?.profileImage?.urls?.small} />
            <div>
                <Title>
                    {children}
                </Title>
                <Timestamp>{moment(date).fromNow()}</Timestamp>
            </div>
        </ElementContainer>
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

const ElementContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
     padding:.5em;
     background-color: ${props => !props.isSeen ? props.theme.roundButtonColor : ''};
    &:hover{
        cursor: pointer;
        background-color: ${props => props.theme.secondaryElementColor};
    }
`

const Title = styled.p`
    margin:.5em;
    font-size:.7em;

`

const Timestamp = styled.p`
    margin: 0 .5em;
    font-size:.5em;
    color:${props => props.theme.secondaryFontColor};

`