import * as queryString from 'query-string'
import { useMutation } from '@apollo/client'
import { LOGIN_USER_WITH_GOOGLE } from '../GraphQL_Queries'

const urlParams = queryString.parse(window.location.search)

export const useLoginWithGoogle = async () => {
    if (urlParams.error) {
        console.log(`An error occurred: ${urlParams.error}`)
    } else {
        console.log(`The code is: ${urlParams.code}`)
    }

    //if (!urlParams.code) return null

    const [loginWithGoogle, { data, error }] = useMutation(LOGIN_USER_WITH_GOOGLE, {
        variables: {
            code: urlParams.code,
        },
    })

    if (urlParams.code) {
        const data = await loginWithGoogle()
        console.log(data, error)
    }

    return null
}
