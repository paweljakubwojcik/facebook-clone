import React, { createContext, useContext, useReducer, useEffect } from 'react'
import * as themes from '../styles/themes'
import { AuthContext } from './auth'

import { ThemeProvider } from 'styled-components'
import { useUserSettings } from '../Util/Hooks/useUserSettings';

//TODO: incorporate enum types into themes #graphql

const systemPrefferedTheme = window.matchMedia('(prefers-color-scheme:light)');

const ThemeContext = createContext({
    currentTheme: null,
    changeTheme: (themeType) => { },
})

function themeReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload.theme,
                themeName: action.payload.themeName
            }
        default:
            return state;
    }
}

function ThemesProvider(props) {

    const { user } = useContext(AuthContext)
    const { settings } = useUserSettings(user?.id)

    const preferedTheme = settings?.preferredTheme || (systemPrefferedTheme.matches ? 'lightTheme' : 'darkTheme')

    const initialState = {
        theme: themes[preferedTheme],
        themeName: preferedTheme
    }


    const [state, dispatch] = useReducer(themeReducer, initialState)
    const { themeName } = state
    document.body.style.backgroundColor = themes[themeName].backgroundColor
    document.body.style.color = themes[themeName].primaryFontColor


    const changeTheme = (themeType) => {
        document.body.style.backgroundColor = themes[themeType].backgroundColor
        document.body.style.color = themes[themeType].primaryFontColor
        dispatch({
            type: 'CHANGE_THEME',
            payload: {
                theme: themes[themeType],
                themeName: themeType
            }
        })
    }

    useEffect(() => {
        if(settings?.preferredTheme)
        changeTheme(settings?.preferredTheme)
        return () => {

        }
    }, [settings])


    return (
        <ThemeContext.Provider value={{ changeTheme, themeName }} {...props}>
            <ThemeProvider theme={state.theme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemesProvider }