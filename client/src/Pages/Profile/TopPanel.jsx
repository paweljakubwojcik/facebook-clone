import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { ShowableButton } from '../../Components/General/Buttons'
import Avatar from '../../Components/General/Avatar'
import ChangeImageForm from './ChangeImageForm'

import { useIntersectionObserver } from '../../Util/Hooks/useIntersectionObserver'
import { UserMatchContext } from './userMatchContext'

export default function TopPanel({ loading, user, width }) {
    const isViewerTheOwner = useContext(UserMatchContext)

    const [profileForm, toggleProfileForm] = useState(false)
    const [backgroundForm, toggleBackgroundForm] = useState(false)
    const [avatarOpacity, setAvatarOpacity] = useState(1)

    const array = new Array(50).fill(1)
    const thresholds = array.map((a, i) => i / 50)
    const [setRef] = useIntersectionObserver(
        {
            threshold: thresholds,
        },
        ({ intersectionRatio: ratio }) => {
            //setAvatarOpacity(ratio * 1.5 - 0.5)
        }
    )

    return (
        <Container>
            {user && (
                <>
                    <GradientContainer img={user?.backgroundImage?.urls?.medium}>
                        <BackgroundImage img={user?.backgroundImage?.urls?.large || null} width={width}>
                            <BackgroundLink to={`/image/${user?.backgroundImage?.id}`}></BackgroundLink>
                            {isViewerTheOwner && (
                                <EditButton parent={BackgroundImage} onClick={() => toggleBackgroundForm(true)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </EditButton>
                            )}
                        </BackgroundImage>
                    </GradientContainer>
                    {backgroundForm && <ChangeImageForm toggleForm={toggleBackgroundForm} user={user} type="background" />}
                    <User>
                        <AvatarContainer>
                            <AvatarLink to={`/image/${user?.profileImage?.id}`}>
                                <Avatar image={user?.profileImage?.urls?.large} large ref={setRef} style={{ opacity: avatarOpacity }} />
                            </AvatarLink>
                            {isViewerTheOwner && (
                                <EditButton parent={AvatarContainer} onClick={() => toggleProfileForm(true)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </EditButton>
                            )}
                        </AvatarContainer>
                        <h2>{user?.username}</h2>
                    </User>
                    {profileForm && <ChangeImageForm toggleForm={toggleProfileForm} user={user} type="profile" />}
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: fit-content;
    background-color: ${(props) => props.theme.primaryElementColor};
`

const User = styled.div`
    position: relative;
    h2 {
        margin: 0.7em;
        font-size: 1.6em;
    }
`

const GradientContainer = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #00000000;
    &::before {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        filter: blur(5em);
        background-image: url(${(props) => props.img});
    }
    &::after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: linear-gradient(to top, ${(props) => props.theme.primaryElementColor} 20%, #00000000);
    }
`

const AvatarContainer = styled.div`
    position: absolute;
    bottom: 100%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, 1.2em);
`

const AvatarLink = styled(Link)``

const BackgroundLink = styled(Link)`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
`

const BackgroundImage = styled.div`
    display: block;
    position: relative;
    z-index: 1;
    background-color: ${(props) => props.theme.secondaryElementColor};
    background-image: url(${(props) => props.img});
    background-position: center;
    background-size: cover;
    border-radius: 0 0 1em 1em;
    width: 100%;
    max-width: ${(props) => props.width}px;
    height: 300px;
    min-height: 160px;
    box-shadow: ${(props) => props.theme.standardShadow};

    @media (max-width: ${(props) => props.width}px) {
        border-radius: 0;
        height: 30vw;
    }
`

const EditButton = styled(ShowableButton)`
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    z-index: 4;
`
