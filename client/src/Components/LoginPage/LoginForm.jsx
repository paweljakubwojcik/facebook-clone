import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'

import { AuthContext } from '../../Context/auth'

import { Form } from './Form'
import Input from './Input'
import FormButton from '../General/FormButton'

import { useForm } from '../../Util/Hooks'
import { LOGIN_USER } from '../../Util/GraphQL_Queries'

export default function LoginForm({ setForm }) {
    const history = useHistory()
    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})

    const initialState = {
        username: '',
        password: '',
    }

    const { onChange, onSubmit, values } = useForm(login, initialState)


    //graphQL query
    const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
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
            else
                setErrors({
                    unknown: 'Check your internet connection, it appears to be faking it\'s presence'
                })
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
            {errors.unknown && <ErrorMessage>{errors.unknown}</ErrorMessage>}
            <FormButton type='submit' primary loading={loading}>{error ? 'Try Again' : 'Log In'}</FormButton>
            <div className='link'>
                <p>First time here?</p>
                <div className='changeForm' role="button" onClick={setForm.bind(this, 'register')}>Create new account</div>
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

const ErrorMessage = styled.p`
    color:#c22c2c;
    font-size:.8em;
    display:inline-block;
`



