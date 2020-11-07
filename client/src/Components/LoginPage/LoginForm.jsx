import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import Button from './Button'
import { Link } from 'react-router-dom'

export default function LoginForm() {
    return (
        <Form className='login__form'>
            <h2>Log In</h2>
            <Input label='Username' type='text' />
            <Input label='Password' type='password' />
            <Button primary>Log In</Button>
            <div className='link'>
                <p>First time here?</p>
                <Link to='/register'>Create new account</Link>
            </div>
            <Providers>
                <p>Or login using one of following:</p>
                <Button >Facebook</Button>
                <Button >Google</Button>
            </Providers>
        </Form>
    )
}

export const Form = styled.form`
    h2{
        font-size:2em;
        width:100%;
        text-align:center;
    }   
    justify-self:center;
    align-self:center;
    padding:1em;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .link{
        display:flex;
        width:100%;
        justify-content:end;
        font-size:.9em;
        p{
            opacity:.8;
            margin: 0 .3em;
        }
        a{
            font-weight:bold;
            opacity:1;
        }
    }
`

const Providers = styled.div`
    
    margin:2em 0;
`

