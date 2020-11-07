import React from 'react'
import UnsplashImage from '../Components/LoginPage/UnsplashImage'
import TwoColumnLayout from '../Layouts/TwoColumnLayout'
import RegisterForm from '../Components/LoginPage/RegisterForm'

export default function Login() {
    return (
        <TwoColumnLayout>
            <UnsplashImage></UnsplashImage>
            <RegisterForm></RegisterForm>
        </TwoColumnLayout>
    )
}
