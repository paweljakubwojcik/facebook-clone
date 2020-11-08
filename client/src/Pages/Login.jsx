import React, { useState } from 'react'
import UnsplashImage from '../Components/LoginPage/UnsplashImage'
import TwoColumnLayout from '../Layouts/TwoColumnLayout'
import LoginForm from '../Components/LoginPage/LoginForm'
import RegisterForm from '../Components/LoginPage/RegisterForm'

export default function Login() {

    const [isLoginForm, changeForm] = useState(true)


    return (
        <TwoColumnLayout>
            <UnsplashImage></UnsplashImage>
            { isLoginForm ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />}
        </TwoColumnLayout>
    )
}
