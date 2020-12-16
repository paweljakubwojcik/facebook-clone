import React from 'react'
import styled from 'styled-components'
import { ReactComponent as NotFoundImage } from '../../styles/svg/undraw_starry_window_ppm0.svg'


export default function NotFound() {
    return (
        <Container>
            <NotFoundImage style={{ width: '100%' }} />
            <p>Faker not found</p>
        </Container>
    )
}

const Container = styled.div`
    position:relative;
    width:500px;
    margin: auto;
    p{
        font-weight:bold;
        position:absolute;
        left:50%;
        bottom:20%;
        transform:translate(-50%,0);
    }

`
