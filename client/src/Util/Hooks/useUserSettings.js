/* import { gql, useQuery, useMutation } from '@apollo/client'
import { useCallback, useState, useContext } from 'react'
import { AuthContext } from '../../Context/auth'


export const useUserSettings = (userId) => {
    const {
        user: { id } = {},
    } = useContext(AuthContext)

    const { data: { user: { settings } = {} } = {} } = useQuery(GET_USER_SETTINGS, {
        variables: {
            userId: id,
        },
    })

    const [error, setError] = useState(null)

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
                    setError(e)
                },
            })
        },
        [updateSettings]
    )

    return { settings, setSettings, error }
}
 */