import React from 'react'
import styled from 'styled-components'
import { ReactComponent as NotFoundImage } from '../../styles/svg/undraw_starry_window_ppm0.svg'


export default function NotFound({ message }) {
    return (
        <Container>
            <NotFoundImage style={{ width: '100%', margin:'1em' }} />
            <p>{message}</p>
        </Container>
    )
}

const Container = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    max-width:500px;
    margin: 2em auto;
    color:${props => props.theme.primaryColor};
    p{
        font-weight:bold;
        font-size:1.5em;
        width:max-content;
        max-width:100%;
        text-align:center;
    }

`
