import { useContext, useEffect, useCallback } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { AuthContext } from '../../Context/auth'
import { GET_CURRENT_USER, UPDATE_SETTINGS } from '../GraphQL_Queries'

export const useCurrentUser = (props) => {
    const { userId, isLogged } = useContext(AuthContext)

    const [fetchUserData, { data: { user } = {}, loading, called }] = useLazyQuery(
        GET_CURRENT_USER,
        {
            onError: (e) => {
                console.log(e)
            },
            variables: {
                userId,
            },
            fetchPolicy: 'cache-first',
        }
    )

    useEffect(() => {
        if (isLogged) {
            fetchUserData()
        } else {
        }
    }, [isLogged, fetchUserData])

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

    return { user, setSettings, loading: (loading || !called) && isLogged, isLogged }
}
