import React from 'react'
import styled from 'styled-components'
import { ReactComponent as NotFoundImage } from '../../styles/svg/undraw_starry_window_ppm0.svg'


export default function NotFound({ message }) {
    return (
        <Container>
            <NotFoundImage style={{ width: '100%' }} />
            <p>{message}</p>
        </Container>
    )
}

const Container = styled.div`
    position:relative;
    max-width:500px;
    margin: auto;
    color:${props => props.theme.primaryColor};
    p{
        font-weight:bold;
        position:absolute;
        left:50%;
        top:90%;
        transform:translate(-50%,0);
        font-size:1.5em;
        width:max-content;
    }

`
