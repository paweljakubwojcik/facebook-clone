import React from 'react'
import UnsplashImage from '../Components/LoginPage/UnsplashImage'
import TwoColumnLayout from '../Layouts/TwoColumnLayout'
import LoginForm from '../Components/LoginPage/LoginForm'

export default function Login() {
    return (
        <TwoColumnLayout>
            <UnsplashImage></UnsplashImage>
            <LoginForm></LoginForm>
        </TwoColumnLayout>
    )
}
