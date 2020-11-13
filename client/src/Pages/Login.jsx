import React from 'react'
import UnsplashImage from '../Components/LoginPage/UnsplashImage'
import TwoColumnLayout from '../Layouts/TwoColumnLayout'
import LoginForm from '../Components/LoginPage/LoginForm'
import RegisterForm from '../Components/LoginPage/RegisterForm'

export default function Login({ whichForm, setForm }) {




    return (
        <TwoColumnLayout>
            <UnsplashImage></UnsplashImage>
            { whichForm === 'login' && <LoginForm setForm={setForm} />}
            {whichForm === 'register' && <RegisterForm setForm={setForm} />}
        </TwoColumnLayout>
    )
}
