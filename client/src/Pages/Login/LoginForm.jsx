import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'

import { AuthContext } from '../../Context/auth'

import Form from './Form'

import { useForm } from '../../Util/Hooks/useForm'
import { LOGIN_USER } from '../../Util/GraphQL_Queries'
import { getGoogleAuthLink } from '../../Util/Methods'

export default function LoginForm({ setForm }) {
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
        },
        onError(err) {
            if (err.graphQLErrors[0])
                setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors)
            else
                setErrors({
                    unknown:
                        "Check your internet connection, it appears to be faking it's presence",
                })
        },
        variables: values,
    })

    function login() {
        loginUser()
    }

    return (
        <Form onSubmit={onSubmit} novalidate>
            <Form.Title>Log In</Form.Title>
            <Form.Input
                label="Username"
                type="text"
                name="username"
                value={values.username}
                onChange={onChange}
                error={errors.username}
            />
            <Form.Input
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={onChange}
                error={errors.password}
            />
            {errors.unknown && <ErrorMessage>{errors.unknown}</ErrorMessage>}
            <Form.Button type="submit" primary loading={loading}>
                {error ? 'Try Again' : 'Log In'}
            </Form.Button>
            <Form.Row>
                <p>First time here?</p>
                <Form.ChangeFormButton onClick={setForm.bind(this, 'register')}>
                    Create new account
                </Form.ChangeFormButton>
            </Form.Row>
            <Providers>
                <p>Or login using one of the following:</p>
                <Form.Button type="button">Facebook</Form.Button>
                <Form.Button type="button" as="a" href={getGoogleAuthLink()} target="blank">
                    Google
                </Form.Button>
            </Providers>
        </Form>
    )
}

const Providers = styled.div`
    margin: 2em 0;
`

const ErrorMessage = styled.p`
    color: #c22c2c;
    font-size: 0.8em;
    display: inline-block;
`
