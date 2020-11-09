import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation, gql } from '@apollo/client'

import { AuthContext } from '../../Context/auth'

import { Form } from './Form'
import Input from './Input'
import FormButton from './FormButton'

import { useForm } from '../../Util/Hooks'

export default function LoginForm({ changeForm }) {
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
            //adds user data to context
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
            <FormButton type='submit' primary loading={loading}>Log In</FormButton>
            <div className='link'>
                <p>First time here?</p>
                <div className='changeForm' role="button" onClick={changeForm.bind(this, false)}>Create new account</div>
            </div>
            <Providers>
                <p>Or login using one of the following:</p>
                <FormButton type='button'>Facebook</FormButton>
                <FormButton type='button'>Google</FormButton>
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

