import React, { createContext, useReducer } from 'react'

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, { user: null })

    const login = (userData) => {
        sessionStorage.setItem('token', userData.token)
        sessionStorage.setItem('user', userData.username)
        sessionStorage.setItem('id', userData.id)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }
    const logout = () => {
        sessionStorage.clear()
        dispatch({
            type: 'LOGOUT',
        })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }