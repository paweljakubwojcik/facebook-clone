import React, { createContext, useContext, useState, useEffect } from 'react'
import * as themes from '../styles/themes'

import { ThemeProvider } from 'styled-components'
import { useCurrentUser } from '../Util/Hooks/useCurrentUser'

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
    const { user: { settings } = {}, setSettings } = useCurrentUser()

    const initialState = {
        theme: themes[initialTheme],
        themeName: initialTheme,
    }

    const [state, setState] = useState(initialState)

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
            setState({ theme: themes[settings.preferredTheme], themeName: settings.preferredTheme })
        return () => {}
    }, [settings, setState, state])

    return (
        <ThemeContext.Provider value={{ changeTheme, themeName: state.themeName }} {...props}>
            <ThemeProvider theme={state.theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemesProvider }
