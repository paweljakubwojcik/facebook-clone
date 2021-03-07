import { useContext, createContext, useEffect, useState, useCallback } from 'react'
import { useLazyQuery, useMutation, useApolloClient } from '@apollo/client'
import { AuthContext } from '../../Context/auth'
import { GET_CURRENT_USER, UPDATE_SETTINGS } from '../GraphQL_Queries'

export const useCurrentUser = (props) => {
    const { userId, isLogged } = useContext(AuthContext)

    const client = useApolloClient()

    const [fetchUserData, { data: { user } = {}, loading}] = useLazyQuery(
        GET_CURRENT_USER,
        {
            onError: (e) => {
                console.log(e)
            },
            variables: {
                userId,
            },
        }
    )

    useEffect(() => {
        console.log(isLogged)
        if (isLogged) {
            fetchUserData()
        } else {
    
        }
    }, [isLogged, fetchUserData, client])

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

    return { user, setSettings, loading, isLogged }
}
