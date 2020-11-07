import React, { useContext, useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom'


import Input from './Input'
import Button from './Button'
import { Form } from './Form'

import { useForm } from '../../Util/Hooks'
import { AuthContext } from '../../Context/auth'




export default function RegisterForm() {
    const history = useHistory()

    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const { onChange, onSubmit, values } = useForm(registerUser, initialState)

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        //executed if mutation is succesful
        update(proxy, { data: { register: userData } }) {
            context.login(userData)
            setErrors({})
            history.push('/')
        },
        onError(err) {
            if (err.graphQLErrors[0])
                setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors)
        },
        variables: values
    })

    function registerUser() {
        addUser()
    }


    return (
        <Form className='register__form' onSubmit={onSubmit} novalidate>
            <h2>Register</h2>
            <Input label='Username' type='text' name='username' value={values.username} onChange={onChange} error={errors.username} />
            <Input label='Email' type='email' name='email' value={values.email} onChange={onChange} error={errors.email} />
            <Input label='Password' type='password' name='password' value={values.password} onChange={onChange} error={errors.password} />
            <Input label='Confirm Password' type='password' name='confirmPassword' value={values.confirmPassword} onChange={onChange} error={errors.confirmPassword} />
            <Button primary loading={loading}>Join</Button>
            <div className='link'>
                <p>Have an account? </p>
                <Link to='/login'>Log In</Link>
            </div>
        </Form>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username,
                email: $email,
                password: $password,
                confirmPassword:$confirmPassword,
            }
        ){
            id
            token
            username
            email
            createdAt
        }
    }
`