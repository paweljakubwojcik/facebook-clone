const axios = require('axios')

async function getAccessTokenFromCode(code) {
    try {
        const { data } = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: 'post',
            data: {
                client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
                client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.CLIENT_URL + process.env.GOOGLE_AUTH_URL_PATH,
                code,
            },
        })
        // { access_token, expires_in, token_type, refresh_token }
        return data.access_token
    } catch (e) {
        throw new Error('there has been problem during authorization of your Google account')
    }
}

/**
 *
 * @param {String} code from fro redirect url provided by google
 * @returns {Promise<Object>} user
 */

module.exports.validateGoogleUser = async (code) => {
    try {
        const token = await getAccessTokenFromCode(code)

        const { data } = await axios({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return data
    } catch (e) {
        throw new Error('there has been problem during retrieving data from Google account')
    }
}
