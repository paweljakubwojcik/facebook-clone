import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import PostContent from '../Post/PostContent'


export default function Post({ postId }) {

    console.log(postId)

    const { loading, error, data: { getPost: post } = {} } = useQuery(GET_POST, {
        variables: {
            postId
        }
    })

    return (
        <PostWrapper>
            {post && <PostContent post={post} noImages />}
        </PostWrapper>
    )
}


const PostWrapper = styled.div`

    position:relative;
    margin-top:60px;
    padding:.5em;
    background-color:${props => props.theme.primaryElementColor};
    width:400px;
    overflow-y:auto;
    overflow-x:hidden;

`

const GET_POST = gql`
query getPost($postId:ID!){
    getPost(postId:$postId){
        
            body
            commentsCount
            id
            createdAt
            likesCount
            username
            privacy
            isDeletable
            user{
                id
                username
                profileImage{
                        urls{
                            small
                            medium
                        }
                    }
            }
            comments {
                id
                body
                username
                createdAt
                likesCount
                user{
                    username
                    id
                }
                likes{
                    id
                    username
                }
            }
            likes {
                id
                username
            }
            images{
                id
                urls{
                    medium
                    small
                }
            }
        
    }
}
`