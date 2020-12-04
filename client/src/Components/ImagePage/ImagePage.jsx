import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location';
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { GET_IMAGE, GET_POST } from '../../Util/GraphQL_Queries'

import { RoundButton } from '../General/Buttons'
import PostCard from '../Post/PostCard';

export default function ImagePage() {

    const { id } = useParams()
    const lastLocation = useLastLocation();

    const { loading, error, data: { getImage: image } = {} } = useQuery(GET_IMAGE, {
        variables: {
            imageId: id
        }
    })

    const { loading: postLoading, error: postError, data: { getPost: post } = {} } = useQuery(GET_POST, {
        variables: {
            postId: image.id
        }
    })

    const Image = ({ image }) => {
        return (
            <ImageContainer image={image.urls.large} >

                <XButton as={Link} to={lastLocation?.pathname || '/'}><FontAwesomeIcon icon={faTimes} /></XButton>
                <Img src={image.urls.large} />
            </ImageContainer>
        )
    }

    return (
        <Wrapper>
            {image && <Image image={image} />}
            <PostCard post={null} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:grid;
    grid-template-columns:3fr 1fr; 

`

const XButton = styled(RoundButton)`
    position:absolute;
    top:5px;
    left:1em;

`

const ImageContainer = styled.div`

    display:flex;
    z-index:2;
    position:absolute;
    top:0;
    height:100vh;
    width:75vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:${props => props.theme.backgroundColor};
    border-right: solid 1px ${props => props.theme.borderColor};
   
    &::before{
        content:'';
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        z-index:-1;
        display:block;
        width:120%;
        height:120%;
        background-image:url(${props => props.image});
        background-position: center;
        background-size: cover;
        filter: blur(10px) brightness(.8);
    }

`

const Img = styled.img`
   
    width:100%;

`