import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'

import Form from './Form'

import { useForm } from '../../Util/Hooks/useForm'
import { AuthContext } from '../../Context/auth'
import { REGISTER_USER } from '../../Util/GraphQL_Queries'

export default function RegisterForm({ setForm }) {
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
        },
        onError(err) {
            if (err.graphQLErrors[0])
                setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors || {})
        },
        variables: values,
    })

    function registerUser() {
        addUser()
    }

    return (
        <Form onSubmit={onSubmit} novalidate>
            <Form.Title>Register</Form.Title>
            <Form.Input
                label="Username"
                type="text"
                name="username"
                value={values.username}
                onChange={onChange}
                error={errors.username}
            />
            <Form.Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={onChange}
                error={errors.email}
            />
            <Form.Input
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={onChange}
                error={errors.password}
            />
            <Form.Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword}
            />
            <Form.Button primary loading={loading}>
                Join
            </Form.Button>
            <Form.Row>
                <p>Have an account? </p>
                <Form.ChangeFormButton onClick={setForm.bind(this, 'login')}>
                    Log In
                </Form.ChangeFormButton>
            </Form.Row>
        </Form>
    )
}
