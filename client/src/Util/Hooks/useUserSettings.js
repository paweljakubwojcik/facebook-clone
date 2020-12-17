import { useContext } from 'react'
import { AuthContext } from '../../Context/auth'
import { gql, useQuery, useMutation } from '@apollo/client'



const UPDATE_SETTINGS = gql`
    mutation updateSettings(
        $setting:String!
        $newValue:String!
    ){
        updateUser(setting: $setting, newValue: $newValue){
            id
            settings{
                prefferedTheme
                postDefaultPrivacy
            }
        }
}`

const GET_USER_SETTINGS = gql`
    query getUser(  $userId: ID! ){
        getUser( userId: $userId,) {
            id
            settings{
                prefferedTheme
                postDefaultPrivacy
            }
        }
}
`


export const useUserSettings = (userId) => {

    const { data: { getUser: { settings } = {} } = {} } = useQuery(GET_USER_SETTINGS, {
        variables: {
            userId
        }
    })

    const [updateSettings] = useMutation(UPDATE_SETTINGS)

    const setSettings = (setting, newValue) => {
        updateSettings({
            variables: {
                setting,
                newValue
            }
        })
    }


    return { settings, setSettings }
}