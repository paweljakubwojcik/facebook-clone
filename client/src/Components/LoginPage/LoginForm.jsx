import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation, gql } from '@apollo/client'

import { AuthContext } from '../../Context/auth'

import { Form } from './Form'
import Input from './Input'
import Button from './Button'

import { useForm } from '../../Util/Hooks'

export default function LoginForm() {
    const history = useHistory()
    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})

    const initialState = {
        username: '',
        password: '',
    }

    const { onChange, onSubmit, values } = useForm(login, initialState)


    //graphQL query
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        //executed if mutation is succesful
        update(proxy, { data: { login: userData } }) {
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

    function login() {
        loginUser()
    }

    return (
        <Form className='login__form' onSubmit={onSubmit} novalidate>
            <h2>Log In</h2>
            <Input label='Username' type='text' name="username" value={values.username} onChange={onChange} error={errors.username} />
            <Input label='Password' type='password' name="password" value={values.password} onChange={onChange} error={errors.password} />
            <Button type='submit' primary loading={loading}>Log In</Button>
            <div className='link'>
                <p>First time here?</p>
                <Link to='/register'>Create new account</Link>
            </div>
            <Providers>
                <p>Or login using one of following:</p>
                <Button type='button'>Facebook</Button>
                <Button type='button'>Google</Button>
            </Providers>
        </Form>
    )
}



const Providers = styled.div`
    
    margin:2em 0;
`

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username,
                password: $password,
        ){
            id
            token
            username
            email
            createdAt
        }
    }
`

