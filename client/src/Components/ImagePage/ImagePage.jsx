import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location';
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { GET_IMAGE } from '../../Util/GraphQL_Queries'

import { RoundButton } from '../General/Buttons'
import Post from './Post';


export default function ImagePage() {

    const { id } = useParams()
    const lastLocation = useLastLocation();

    const { loading, error, data: { getImage: image } = {} } = useQuery(GET_IMAGE, {
        variables: {
            imageId: id
        }
    })

    const Image = ({ image }) => {
        return (
            <ImageContainer image={image.urls.small} >

                <XButton as={Link} to={lastLocation?.pathname || '/'}><FontAwesomeIcon icon={faTimes} /></XButton>
                <Img src={image.urls.large} />
            </ImageContainer>
        )
    }

    return (
        <Wrapper>
            {image && <Image image={image} />}
            {image && <Post postId={image.post.id}></Post>}

        </Wrapper>
    )
}


const Wrapper = styled.div`
    display:flex;;
    pointer-events:none;
    grid-auto-flow:row;
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    & > * {
        pointer-events:all;
    }
   

`

const XButton = styled(RoundButton)`
    position:absolute;
    top:5px;
    left:1em;

`

const ImageContainer = styled.div`

    display:flex;
    position:relative;
    z-index:2;
    top:0;
    height:100vh;
    width:calc(100% - 400px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:transparent;
    border-right: solid 1px ${props => props.theme.borderColor};
   
    &::before{
        content:'';
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%) scale(1.1);;
        z-index:-1;
        display:block;
        width:100%;
        height:100%;
        background-image:url(${props => props.image});
        background-position: center;
        background-size: cover;
        filter: blur(5px) brightness(.8);
    }

`

const Img = styled.img`
   
    max-width:100%;
    max-height:100%;

`