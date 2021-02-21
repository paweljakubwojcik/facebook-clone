import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client';



import Input from './Input'
import FormButton from '../../Components/General/FormButton'
import { Form } from './Form'

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
            <FormButton primary loading={loading}>Join</FormButton>
            <div className='link'>
                <p>Have an account? </p>
                <div className='changeForm' role="button" onClick={setForm.bind(this, 'login')}>Log In</div>
            </div>
        </Form>
    )
}

