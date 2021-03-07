import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import PostContent from '../../Components/Post/PostContent'
import { GET_POST} from '../../Util/GraphQL_Queries'

export default function Post({ postId }) {

    const { loading, data: { post } = {} } = useQuery(GET_POST, {
        variables: {
            postId
        }
    })

    return (
        <PostWrapper>
            {loading && <p>Loading...</p>}
            {post && <PostContent post={post} noImages />}

        </PostWrapper>
    )
}


const PostWrapper = styled.div`

    position:relative;
    margin-top:60px;
    padding:2em .5em;
    background-color:${props => props.theme.primaryElementColor};
    width:400px;
    overflow-y:auto;
    overflow-x:hidden;

    @media (max-width:600px){
        width:100%;
        margin-top:0;
        height:fit-content;
    }

`

