import React, { createContext, useReducer } from 'react'

import jwtDecode from 'jwt-decode'
import { useApolloClient } from '@apollo/client'

const initialState = {
    user: null,
}

// to ensure that refreshng wont logout the user
if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'))
    if (decodedToken.exp * 1000 < Date.now()) localStorage.removeItem('token')
    else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            }

        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    const client = useApolloClient()

    const login = (userData) => {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('theme', userData.settings.preferredTheme)
        dispatch({
            type: 'LOGIN',
            payload: userData,
        })
    }
    const logout = () => {
        localStorage.clear()
        client.clearStore()
        dispatch({
            type: 'LOGOUT',
        })
    }

    return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
}

export { AuthContext, AuthProvider }
