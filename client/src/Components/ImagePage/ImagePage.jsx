import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location';
import { useQuery } from '@apollo/client'
import { GET_IMAGE } from '../../Util/GraphQL_Queries'

import { RoundButton } from '../General/Buttons'

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
            <ImageContainer image={image.urls.large} >

                <XButton as={Link} to={lastLocation?.pathname || '/'}>X</XButton>
                <Img src={image.urls.large} />
            </ImageContainer>
        )
    }

    return (
        <>
            {image && <Image image={image} />}
        </>
    )
}

const XButton = styled(RoundButton)`
    position:absolute;
    top:6px;
    left:1em;

`

const ImageContainer = styled.div`

    display:flex;
    z-index:2;
    position:absolute;
    top:0;
    height:100vh;
    width:60vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:${props => props.theme.backgroundColor};
   
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