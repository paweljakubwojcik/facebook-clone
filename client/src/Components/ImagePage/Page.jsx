import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_IMAGE } from '../../Util/GraphQL_Queries'

import Arrows from './Arrows';
import ImageLoader from '../General/ImageLoader'


export default function ImagePage({ setPostId }) {

    const { id } = useParams()

    const { loading, error, data: { image } = {} } = useQuery(GET_IMAGE, {
        variables: {
            imageId: id
        }
    })

    const allImages = image ? image.post.images.map(image => image.id) : null

    useEffect(() => {
        if (image)
            setPostId(image.post.id)
    }, [image, setPostId])

    return (
        <ImageContainer image={image?.urls.small} >
            { image &&
                <>
                    <Arrows currentImage={id} allImages={allImages} />
                    <Image image={image} />
                </>}
            { loading && <ImageLoader />}
            { ((!image && !loading) || error) && <ImageLoader> Can't find this picture </ImageLoader>}
        </ImageContainer>
    )
}

const Image = ({ image }) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            <Img src={image.urls.large} onLoad={() => setLoaded(true)} loaded={loaded} />
        </>
    )
}


const ImageContainer = styled.div`

    display:flex;
    position:relative;
    z-index:1;
    top:0;
    height:100vh;
    width:calc(100% - 400px);
    
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#000000;
    border-right: solid 1px ${props => props.theme.borderColor};
    box-shadow: inset -10px 0 20px -5px ${props => props.theme.shadowColor};

    @media (max-width:600px){
        width:100%;
        height:100vh;
    }

    &:after{
        content:'';
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%) scale(1.1);;
        z-index:-1;
        display:block;
        width:100%;
        height:100%;
        @supports ((-webkit-backdrop-filter: blur(16px)) or (backdrop-filter: blur(16px))) {
            backdrop-filter: blur(16px);
            }
       
    }
   
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
        filter:blur(.5em); 
        @supports ((-webkit-backdrop-filter: blur(16px)) or (backdrop-filter: blur(16px))) {
            filter: brightness(.8);
            }
    }

`

const Img = styled.img`
    max-width:100%;
    max-height:100%;
    transition:opacity .2s;
    opacity:${props => props.loaded ? '1' : '0'};

`

