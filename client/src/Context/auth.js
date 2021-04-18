import React, { createContext, useReducer, useCallback } from 'react'

import jwtDecode from 'jwt-decode'
import { useApolloClient } from '@apollo/client'

const initialState = {
    userId: null,
}

// to ensure that refreshng wont logout the user
if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'))
    if (decodedToken.exp * 1000 < Date.now()) localStorage.removeItem('token')
    else {
        initialState.userId = decodedToken.id
    }
}

const AuthContext = createContext({
    userId: null,
    login: (userData) => {},
    logout: () => {},
    isLogged: false,
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('theme', action.payload.settings?.preferredTheme)
            return {
                ...state,
                userId: action.payload.id,
            }
        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                userId: null,
            }

        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const apollo = useApolloClient()

    const login = useCallback((userData) => {
        dispatch({
            type: 'LOGIN',
            payload: userData,
        })
    }, [])
    const logout = async () => {
        dispatch({
            type: 'LOGOUT',
        })
        apollo.clearStore()
    }
    return (
        <AuthContext.Provider
            value={{ userId: state.userId, login, logout, isLogged: !!state.userId }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }
