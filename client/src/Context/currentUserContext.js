import { useContext, createContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { AuthContext } from './auth'
import { GET_CURRENT_USER } from '../Util/GraphQL_Queries'

const initialState = {
    id: null,
    username: null,
    email: null,
    profileImage: {
        urls: {
            thumbnail: null,
            small: null,
            medium: null,
            large: null,
        },
    },
    notificationsCount: null,
}

export const CurrentUserContext = createContext(initialState)


//TODO: blend in useSettings hook into this
export const CurrentUserProvider = (props) => {
    const {
        user: { id },
    } = useContext(AuthContext)
    const [user, setUser] = useState(initialState)

    const [getCurrentUserInfo] = useLazyQuery(GET_CURRENT_USER, {
        onCompleted: (data) => {
            setUser(data.user)
        },
    })

    useEffect(() => {
        if (id) {
            console.log('fetch')
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

    return (
        <CurrentUserContext.Provider value={user} {...props}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}
