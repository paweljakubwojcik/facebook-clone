import React from 'react'
import Input from './Input'
import Button from './Button'
import { Link } from 'react-router-dom'
import { Form } from './LoginForm'

export default function RegisterForm() {
    return (
        <Form className='register__form'>
            <h2>Register</h2>
            <Input label='Username' type='text' />
            <Input label='Email' type='email' />
            <Input label='Password' type='password' />
            <Input label='Confirm Password' type='password' />
            <Button primary>Join</Button>
            <div className='link'>
                <p>Have an account? </p>
                <Link to='/login'>Log In</Link>
            </div>
        </Form>
    )
}