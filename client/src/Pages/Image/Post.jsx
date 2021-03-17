import React from 'react'
import styled from 'styled-components/macro'
import { useQuery } from '@apollo/client'
import PostContent from '../../Components/Post/PostContent'
import { GET_POST } from '../../Util/GraphQL_Queries'

const width = 450

export default function Post({ postId }) {
    const { loading, data: { post } = {} } = useQuery(GET_POST, {
        variables: {
            postId,
        },
    })

    return (
        <FlexWrapper>
            <PostWrapper>
                {loading && <p>Loading...</p>}
                {post && <PostContent post={post} noImages />}
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
    padding-top: 60px;
    pointer-events: none;

    ${(props) => props.theme.scrollBar};

    @media (max-width: 900px) {
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
    margin-left: calc(100vw - ${width}px);
    background-color: ${(props) => props.theme.primaryElementColor};
    width: ${width}px;
    height: fit-content;

    box-shadow: ${(props) => props.theme.standardShadow};

    @media (max-width: 900px) {
        width: 100%;
        margin-top: 0;
        height: fit-content;
        margin-left: 0;
        bottom: 0;
    }
`
