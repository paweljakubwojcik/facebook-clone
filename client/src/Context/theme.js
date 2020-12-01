import React, { createContext, useReducer } from 'react'
import * as themes from '../styles/themes'

import { ThemeProvider } from 'styled-components'



const systemPrefferedTheme = window.matchMedia('(prefers-color-scheme:light)');

const preferedTheme = localStorage.getItem('preferredTheme') || (systemPrefferedTheme.matches ? 'lightTheme' : 'darkTheme')

const initialState = {
    theme: themes[preferedTheme],
    currentTheme: preferedTheme
}

document.body.style.backgroundColor = themes[initialState.currentTheme].backgroundColor
document.body.style.color = themes[initialState.currentTheme].primaryFontColor


const ThemeContext = createContext({
    currentTheme: null,
    changeTheme: (themeType) => { },
})

function authReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload.theme,
                currentTheme: action.payload.name
            }
        default:
            return state;
    }
}

function ThemesProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const { currentTheme } = state

    const changeTheme = (themeType) => {
        document.body.style.backgroundColor = themes[themeType].backgroundColor
        document.body.style.color = themes[themeType].primaryFontColor
        localStorage.setItem('preferredTheme', themeType)
        dispatch({
            type: 'CHANGE_THEME',
            payload: {
                theme: themes[themeType],
                name: themeType
            }
        })
    }


    return (
        <ThemeContext.Provider value={{ changeTheme, currentTheme }} {...props}>
            <ThemeProvider theme={state.theme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemesProvider }