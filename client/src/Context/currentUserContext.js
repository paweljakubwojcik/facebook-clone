import { useContext, createContext, useEffect, useState, useCallback } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { AuthContext } from './auth'
import { GET_CURRENT_USER, UPDATE_SETTINGS } from '../Util/GraphQL_Queries'

export const CurrentUserContext = createContext({
    user: undefined,
    setSettings: (setting, newValue, callback = () => {}) => {},
})

//TODO: blend in useSettings hook into this
export const CurrentUserProvider = (props) => {
    const { user: { id } = {} } = useContext(AuthContext)

    const [getCurrentUserInfo, { data: { user } = {} }] = useLazyQuery(GET_CURRENT_USER, {
        onError: (e) => {
            console.log(e)
        },
    })

    useEffect(() => {
        if (id) {
            getCurrentUserInfo({
                variables: {
                    userId: id,
                },
                onError: (error) => {
                    console.log(error)
                    throw error
                },
            })
        }
    }, [id, getCurrentUserInfo])

    const [updateSettings] = useMutation(UPDATE_SETTINGS)

    const setSettings = useCallback(
        (setting, newValue, callback = () => {}) => {
            updateSettings({
                variables: {
                    setting,
                    newValue,
                },
                update: () => {
                    callback()
                },
                onError: (e) => {
                    console.log(e)
                },
            })
        },
        [updateSettings]
    )

    return (
        <CurrentUserContext.Provider value={{ user, setSettings }} {...props}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}
