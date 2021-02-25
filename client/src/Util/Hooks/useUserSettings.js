import { gql, useQuery, useMutation } from '@apollo/client'

//TODO: this hook should only have like updateSettings

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
    const { data: { user: { settings } = {} } = {} } = useQuery(GET_USER_SETTINGS, {
        variables: {
            userId,
        },
    })

    const [updateSettings] = useMutation(UPDATE_SETTINGS)

    const setSettings = (setting, newValue) => {
        updateSettings({
            variables: {
                setting,
                newValue,
            },
        })
    }

    return { settings, setSettings }
}
