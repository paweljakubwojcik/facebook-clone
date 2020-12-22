import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { AuthContext } from '../../Context/auth'
import { Link } from 'react-router-dom'


import ElementContainer from './ElementContainer'
import Avatar from './Avatar'
import { FilledButton } from '../General/Buttons'
import DotLoader from './DotLoader';
import ActionButtons from '../ProfilePage/ActionButtons';

const GET_USER_DETAILS = gql`
query getUser(  $userId: ID! ){
 getUser( userId: $userId,) {
    id
    username
    backgroundImage{
        urls{
            id
            medium
        }
    }
    profileImage{
        urls{
            id
            medium
        }
    }
    info{
        joiningDate
        location
        job
    }
    friends{
        id
    }
    invitations{
        id
        from
    }
}
}
`

export default function ProfilePreview({ userId, buttons }) {

    const context = useContext(AuthContext)

    const { data: { getUser: user } = {}, loading } = useQuery(GET_USER_DETAILS, {
        variables: {
            userId
        }
    })

    return (
        <ElementContainer >
            {loading && <DotLoader />}
            {!loading && <Container >
                <Avatar image={user.profileImage?.urls.medium} big className='avatar' />
                <UserName>{user.username}</UserName>
                <div className='infoContainer' >
                    <p>
                        faker since {user.info?.joiningDate}
                    </p>
                    {buttons &&
                        <Buttons >
                            <ActionButtons user={user} context={context} seeProfile />
                        </Buttons>
                    }
                </div>
                <LittleBackground image={user.backgroundImage?.urls.medium} />
            </Container>}
        </ElementContainer>
    )
}

ProfilePreview.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.oneOf(['see profile', 'add to friends', 'send message'])),
    userId: PropTypes.string
}


const Buttons = styled.div`

    display:flex;
    //flex-wrap:wrap;
    font-size:.7em;
    display:grid;
    grid-template-columns:1fr 1fr;
    column-gap: .4em;
    & > * {
        margin:0;
    }

`

const LittleBackground = styled.div`
    position:absolute;
    z-index:-1;
    width:100%;
    height:50%;
    top:0;
    left:0;
    background-image: url(${props => props.image});
    background-size:cover;
    background-position:center;
    filter:brightness(.7);
`

const Container = styled.div`
    position:relative;
    z-index:4;
    min-height:120px;
    min-width:200px;
    display:grid;
    column-gap:.7em;
    grid-template-columns:1fr 2fr;
    grid-template-rows:1fr 1fr;
    justify-items:left;
    align-items:center;

    border-radius:inherit;
    overflow:hidden;
    cursor:default;
    
    .avatar{
        grid-column:1;
        grid-row:1/3;
    }

    p{
        text-align:left;
        margin:.5em 0;
        padding:0;
        color: ${props => props.theme.secondaryFontColor};
        font-size:.7em;
        
    }

    .infoContainer{
        align-self:start;
        width:max-content;
    }

`

const UserName = styled.h4`

        grid-column:2;
        grid-row:1/2;
        color: #fff;
        margin:.5em 0em;
        margin:0;
        font-size:1em;
        font-weight:bold;
        min-width:100px;
        text-align:left;
        align-self:end;


`
