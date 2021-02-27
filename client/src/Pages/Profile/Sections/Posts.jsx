import React from 'react'
import styled from 'styled-components'

import PostsContainer from '../../../Components/Post/PostsContainer'
import ElementContainer from '../../../Components/General/ElementContainer'
import { GenericButton } from '../../../Components/General/Buttons'
import contentTypes from '../contentTypes'

import InfoBrief from '../DetailsElements/InfoBrief'
import PicturesBrief from '../DetailsElements/PicturesBrief'
import FriendsBrief from '../DetailsElements/FriendsBrief'

export default function Posts({ user, setContentType }) {
    return (
        <Container>
            <Details>
                <DetailsElement name={contentTypes.INFO} setContentType={setContentType}>
                    <InfoBrief info={user.info} />
                </DetailsElement>
                <DetailsElement name={contentTypes.PICTURES} setContentType={setContentType}>
                    <PicturesBrief pictures={user.images} />
                </DetailsElement>
                <DetailsElement name={contentTypes.FRIENDS} setContentType={setContentType}>
                    <FriendsBrief friends={user.friends} />
                </DetailsElement>
            </Details>
            <PostsContainer userId={user.id} />
        </Container>
    )
}

const DetailsElement = ({ name, children, setContentType }) => {
    const handleOnClick = (e) => {
        e.target.blur()
        window.scrollTo({
            top: 150,
            behavior: 'smooth',
        })
        setContentType(e.target.value)
    }

    return (
        <ElementContainer>
            <Header>
                <h2>{name.toUpperCase()}</h2>
                <BlueButton value={name} onClick={handleOnClick}>
                    See All
                </BlueButton>
            </Header>
            {children}
        </ElementContainer>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 60%;
    column-gap: 1em;
    width: 100%;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`
const Details = styled.div`
    & > * {
        width: 100%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
`

const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
`