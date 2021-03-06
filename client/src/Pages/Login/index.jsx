import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import UnsplashImage from './UnsplashImage'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Login() {

    const { state } = useLocation()

    const [whichForm, setForm] = useState(state || 'login')

    return (
        <TwoColumnLayout>
            <UnsplashImage></UnsplashImage>
            {whichForm === 'login' && <LoginForm setForm={setForm} />}
            {whichForm === 'register' && <RegisterForm setForm={setForm} />}
        </TwoColumnLayout>
    )
}

const TwoColumnLayout = styled.div`
    width:100%;
    height:100vh;

    display:grid;
    grid-template-columns: 1fr 1fr;

    @media(max-width: 700px) {
        grid-template-columns: 1fr;
        grid-template-rows:1fr 8fr;
        grid-auto-flow:column;
  }
`