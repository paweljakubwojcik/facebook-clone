import React from 'react'
import styled from 'styled-components'

import Logo from '../../styles/images/logo.png'

import { GET_IMAGE_OF_THE_DAY } from '../../Util/GraphQL_Queries'
import { useQuery } from '@apollo/client'

// this component fetch a random photo every time it's mounted
// it may be better to get random photo once per hour and save it in DB - that way every client will have the same photo
// thus number of requests will be decresed

export default function UnsplashImage() {
    const { data: { imageOfTheDay = {} } = {} } = useQuery(GET_IMAGE_OF_THE_DAY, {
        fetchPolicy: 'cache-first',
    })

    const { urls, author } = imageOfTheDay

    return (
        <Container image={urls?.large}>
            <header>
                <img src={Logo} alt="Logo" />
                <h1>Fakebook</h1>
            </header>
            <p>Welcome to the smallest fake community on the Net</p>
            <p className="credits">
                {' '}
                Image by{' '}
                <a target="blank" href={author?.link}>
                    {author?.name}
                </a>
                , powered by Unsplash
            </p>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    position: relative;
    font-size: 1.2em;
    padding: 4%;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.4;
        z-index: 0;
    }
    & > * {
        position: relative;
        z-index: 2;
        cursor: default;
    }
    header {
        display: flex;
        align-items: center;
        h1 {
            margin: 0 2%;
        }
        img {
            height: 2em;
        }
    }
    p {
        margin: 1em 0;
    }
    .credits {
        margin-top: auto;
        font-size: 0.6em;
        font-weight: normal;
    }
    @media (max-width: 700px) {
        .credits {
            display: none;
        }
    }
`
