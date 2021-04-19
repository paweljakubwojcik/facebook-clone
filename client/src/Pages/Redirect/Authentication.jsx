import React, { useContext, useEffect } from 'react'
import * as queryString from 'query-string'

import FlexContainer from '../../Components/General/CommonStyles/FlexContainer'
import { AuthContext } from '../../Context/auth'
import { useMutation } from '@apollo/client'
import { LOGIN_USER_WITH_GOOGLE } from '../../Util/GraphQL_Queries'
import { useHistory } from 'react-router-dom'

const urlParams = queryString.parse(window.location.search)

export default function Authentication() {
    const { login, isLogged } = useContext(AuthContext)

    const history = useHistory()

    if (urlParams.error) {
        console.log(`An error occurred: ${urlParams.error}`)
    } else {
        console.log(`The code is: ${urlParams.code}`)
    }

    const [loginWithGoogle] = useMutation(LOGIN_USER_WITH_GOOGLE, {
        variables: {
            code: urlParams.code,
        },
    })

    useEffect(() => {
        if (urlParams.code && !isLogged) {
            loginWithGoogle()
                .then(({ data: { loginWithGoogle: userData }, error }) => {
                    console.log(userData)
                    login(userData)
                    history.replace('/')
                })
                .catch((error) => {
                    throw error
                })
        } else {
            history.replace('/')
        }
    }, [history, login, loginWithGoogle])

    return <FlexContainer style={{ minHeight: '70vh' }}>Redirecting...</FlexContainer>
}
