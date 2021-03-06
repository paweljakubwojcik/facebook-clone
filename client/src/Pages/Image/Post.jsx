import React from 'react'
import styled from 'styled-components/macro'
import { useQuery } from '@apollo/client'
import { GET_ENTITY } from '../../Util/GraphQL_Queries'

import PostContent from '../../Components/Post/PostContent'
import SkeletonPost from '../../Components/skeletons/SkeletonPost'

import { useHistory } from 'react-router-dom'
import ErrorMessage from '../../Components/General/ErrorMessage'
import { MAX_TABLET_PX } from '../../styles/breakpoints'

//TODO: add nice loader

export default function Post({ postId, postWidth }) {
    const history = useHistory()
    const {
        error,
        loading,
        data: { entity } = {},
    } = useQuery(GET_ENTITY, {
        variables: {
            id: postId,
        },
    })

    return (
        <FlexWrapper>
            <PostWrapper postWidth={postWidth}>
                {loading && <SkeletonPost contentOnly />}
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
    z-index: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    padding-top: var(--navbar-height);
    pointer-events: none;

    ${(props) => props.theme.scrollBar};

    @media (max-width: ${MAX_TABLET_PX}) {
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

    @media (max-width: ${MAX_TABLET_PX}) {
        width: 100%;
        margin-top: 0;
        height: fit-content;
        margin-left: 0;
        bottom: 0;
    }
`
