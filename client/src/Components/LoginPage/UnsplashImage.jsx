import React from 'react'
import styled from 'styled-components'

import TestImage from '../../styles/images/testImage.jpg'
import Logo from '../../styles/images/logo.png'

export default function UnsplashImage() {
    return (
        <Container>
            <header>
                <img src={Logo} alt="Logo" />
                <h1>Fake Facebook</h1>
            </header>
            <p>Welcome to the smallest fake community on the Net</p>
            <p className='credits'> Image from Unsplash by (Author here)</p>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    background-image: url(${TestImage});
    background-size:cover;
    background-position:center;
    position:relative;
    font-size:1.2em;
    padding:4%;
    &::after{
        content:"";
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:#000;
        opacity:.4;
        z-index:0;
    }
    & > *{
        position:relative;
        z-index:2;
        cursor:default;
    }
    header{
        display:flex;
        align-items:center;
        h1{
            margin: 0 2%;
        }
        img{
            height:2em;
        }
    }
    p{
        margin: 1em 0;
    }
    .credits{
        margin-top:auto;
        font-size:.6em;
        font-weight:normal;
    }
    @media (max-width:700px){
        .credits{
            display:none;
        }
    }
`
