import * as queryString from 'query-string'
import { GOOGLE_AUTH_CLIENT_ID } from '../../appConfig'

export const getGoogleAuthLink = () => {
    const stringifiedParams = queryString.stringify({
        client_id: GOOGLE_AUTH_CLIENT_ID,
        redirect_uri: window.location.origin + '/auth',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
    })

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    return googleLoginUrl
}
