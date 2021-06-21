let HTTP_URL, WS_URL
if (process.env.NODE_ENV === 'development') {
    HTTP_URL = 'http://localhost:5000'
    WS_URL = 'ws://localhost:5000/subscriptions'
}
if (process.env.NODE_ENV === 'production') {
    HTTP_URL = 'https://fakebook-fake-facebook.herokuapp.com/'
    WS_URL = 'wss://fakebook-fake-facebook.herokuapp.com/subscriptions'
}

export const GOOGLE_AUTH_CLIENT_ID =
    '160241737973-8rqa8gnbavqb6spmtgilv9rkjfnfbd9c.apps.googleusercontent.com'

export { HTTP_URL, WS_URL }
