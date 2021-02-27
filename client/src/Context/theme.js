import React, { createContext, useContext, useState, useEffect } from 'react'
import * as themes from '../styles/themes'
import { AuthContext } from './auth'

import { ThemeProvider } from 'styled-components'
import { useUserSettings } from '../Util/Hooks/useUserSettings'

//TODO: incorporate enum types into themes #graphql

const isSystemThemeLight = window.matchMedia('(prefers-color-scheme:light)')
const systemPreferedTheme = isSystemThemeLight.matches ? 'lightTheme' : 'darkTheme'

const cookieStoredTheme = localStorage.getItem('theme') // NOTE: if undefined this sometimes returns string of value 'undefined'

const isCookieStoredTheme =
    cookieStoredTheme !== 'undefined' && cookieStoredTheme !== 'null' && cookieStoredTheme
const initialTheme = isCookieStoredTheme ? cookieStoredTheme : systemPreferedTheme

const ThemeContext = createContext({
    currentTheme: null,
    changeTheme: (themeName) => {},
})

function ThemesProvider(props) {
    const { user } = useContext(AuthContext)
    const { settings, setSettings } = useUserSettings(user?.id)

    const initialState = {
        theme: themes[initialTheme],
        themeName: initialTheme,
    }

    const [state, setState] = useState(initialState)
    const { themeName } = state

    const changeTheme = (themeName) => {
        setSettings('preferredTheme', themeName, () => {
            setState({
                theme: themes[themeName],
                themeName,
            })
            localStorage.setItem('theme', themeName)
        })
    }

    // to make sure theme is consistent across multiple devices
    useEffect(() => {
        if (settings?.preferredTheme && settings.preferredTheme !== state.themeName)
            setState({ theme: themes[themeName], themeName })
        return () => {}
    }, [settings, setState, state, themeName])

    return (
        <ThemeContext.Provider value={{ changeTheme, themeName }} {...props}>
            <ThemeProvider theme={state.theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemesProvider }
