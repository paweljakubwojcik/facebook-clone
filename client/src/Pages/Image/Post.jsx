import React from 'react'
import styled from 'styled-components/macro'
import { useQuery } from '@apollo/client'
import PostContent from '../../Components/Post/PostContent'
import { GET_ENTITY } from '../../Util/GraphQL_Queries'

import { useHistory } from 'react-router-dom'
import ErrorMessage from '../../Components/General/ErrorMessage'
import { maxTablet } from '../../styles/breakpoints'

export default function Post({ postId, postWidth }) {
    const { error, loading, data: { entity } = {} } = useQuery(GET_ENTITY, {
        variables: {
            id: postId,
        },
    })

    console.log(entity)
    const history = useHistory()

    return (
        <FlexWrapper>
            <PostWrapper postWidth={postWidth}>
                {loading && <p>Loading...</p>}
                {error && <ErrorMessage>{error.message}</ErrorMessage>}

                {entity && (
                    <PostContent
                        post={entity}
                        noImages
                        onDeleteCallback={() => {
                            history.goBack()
                        }}
                    />
                )}
            </PostWrapper>
        </FlexWrapper>
    )
}

const FlexWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
    padding-top: var(--navbar-height);
    pointer-events: none;

    ${(props) => props.theme.scrollBar};

    @media (max-width: ${maxTablet}) {
        position: relative;
        padding-top: 0;
        height: auto;
        margin-bottom: 3rem;
    }
`

const PostWrapper = styled.div`
    position: relative;
    pointer-events: all;
    z-index: 1;
    padding: 2em 0.5em;
    margin-left: calc(100vw - ${(props) => props.postWidth}px);
    background-color: ${(props) => props.theme.primaryElementColor};
    width: ${(props) => props.postWidth}px;
    height: fit-content;

    box-shadow: ${(props) => props.theme.standardShadow};

    @media (max-width: ${maxTablet}) {
        width: 100%;
        margin-top: 0;
        height: fit-content;
        margin-left: 0;
        bottom: 0;
    }
`
