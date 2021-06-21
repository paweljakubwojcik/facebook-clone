import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

import ElementContainer from './ElementContainer'
import Avatar from './Avatar'
import { FilledButton } from '../General/Buttons'
import DotLoader from './DotLoader'
import { GET_USER_DETAILS } from '../../Util/GraphQL_Queries'

export default function ProfilePreview({ userId }) {
    const { data: { user } = {}, loading } = useQuery(GET_USER_DETAILS, {
        variables: {
            userId,
        },
    })

    return (
        <ElementContainer>
            {loading && <DotLoader />}
            {!loading && (
                <Container>
                    <Avatar image={user.profileImage?.urls.medium} big className="avatar" />
                    <UserName>{user.username}</UserName>
                    <div className="infoContainer">
                        <p>faker since {user.info?.joiningDate}</p>
                        <Buttons>
                            <FilledButton as={Link} to={`/profile/${user.id}`}>
                                <span> See profile </span>
                            </FilledButton>
                        </Buttons>
                    </div>
                    <LittleBackground image={user.backgroundImage?.urls.medium} />
                </Container>
            )}
        </ElementContainer>
    )
}

ProfilePreview.propTypes = {
    userId: PropTypes.string,
}

const Buttons = styled.div`
    display: flex;
    //flex-wrap:wrap;
    font-size: 0.7em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.4em;
    & > * {
        margin: 0;
    }
`

const LittleBackground = styled.div`
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 50%;
    top: 0;
    left: 0;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    filter: brightness(0.7);
`

const Container = styled.div`
    position: relative;
    z-index: 4;
    min-height: 120px;
    min-width: 200px;
    display: grid;
    column-gap: 0.7em;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    justify-items: left;
    align-items: center;

    border-radius: inherit;
    overflow: hidden;
    cursor: default;

    .avatar {
        grid-column: 1;
        grid-row: 1/3;
    }

    p {
        text-align: left;
        margin: 0.5em 0;
        padding: 0;
        color: ${(props) => props.theme.secondaryFontColor};
        font-size: 0.7em;
    }

    .infoContainer {
        align-self: start;
        width: max-content;
        font-weight: normal;
    }
`

const UserName = styled.h4`
    grid-column: 2;
    grid-row: 1/2;
    color: #fff;
    margin: 0.5em 0em;
    margin: 0;
    font-size: 1em;
    font-weight: bold;
    min-width: 100px;
    text-align: left;
    align-self: end;
`
