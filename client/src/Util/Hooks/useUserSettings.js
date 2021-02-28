import { gql, useQuery, useMutation } from '@apollo/client'
import { useCallback, useState, useContext } from 'react'
import { AuthContext } from '../../Context/auth'

const UPDATE_SETTINGS = gql`
    mutation updateSettings($setting: String!, $newValue: String!) {
        updateSettings(setting: $setting, newValue: $newValue) {
            id
            settings {
                preferredTheme
                postDefaultPrivacy
            }
        }
    }
`

const GET_USER_SETTINGS = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            id
            settings {
                preferredTheme
                postDefaultPrivacy
            }
        }
    }
`

export const useUserSettings = (userId) => {
    const {
        user: { id },
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
