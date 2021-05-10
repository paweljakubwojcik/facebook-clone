import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { AuthContext } from './auth'

const localMin = localStorage.getItem('minifiedConversations')
const localActive = localStorage.getItem('activeConversations')

const initialState = {
    activeConversations: localActive ? JSON.parse(localActive) : [],
    minimalizedConversations: localMin ? JSON.parse(localMin) : [],
}

const MessengerContext = createContext({
    ...initialState,
    addChat: (chatId) => {},
    removeChat: (chatId) => {},
    minimaliseChat: (chatId) => {},
    maximalizeChat: (chatId) => {},
    clear: () => {},
})

const reducer = (state, action) => {
    const { activeConversations, minimalizedConversations } = state
    const { type, payload } = action
    let newActive = activeConversations,
        newMinified = minimalizedConversations

    switch (type) {
        case 'ADD_TO_ACTIVE':
        case 'REMOVE_FROM_MINIFIED':
            newMinified = minimalizedConversations.filter((id) => id !== payload)
            newActive = activeConversations.includes(payload)
                ? activeConversations
                : [...activeConversations, payload]
            break
        case 'REMOVE_CHAT':
            newActive = activeConversations.filter((id) => id !== payload)
            newMinified = minimalizedConversations.filter((id) => id !== payload)
            break
        case 'ADD_TO_MINIFIED':
            newActive = activeConversations.filter((id) => id !== payload)
            newMinified = minimalizedConversations.includes(payload)
                ? minimalizedConversations
                : [...minimalizedConversations, payload]

            break
        case 'CLEAR':
            newActive = []
            newMinified = []
            break
        default:
            break
    }
    localStorage.setItem('activeConversations', JSON.stringify(newActive))
    localStorage.setItem('minifiedConversations', JSON.stringify(newMinified))
    return {
        ...state,
        activeConversations: newActive,
        minimalizedConversations: newMinified,
    }
}

function MessengerProvider(props) {
    const [{ activeConversations, minimalizedConversations }, dispatch] = useReducer(
        reducer,
        initialState
    )

    const addChat = useCallback((chatId) => {
        dispatch({
            type: 'ADD_TO_ACTIVE',
            payload: chatId,
        })
    }, [])

    const removeChat = useCallback((chatId) => {
        dispatch({
            type: 'REMOVE_CHAT',
            payload: chatId,
        })
    }, [])

    const minimaliseChat = useCallback((chatId) => {
        dispatch({
            type: 'ADD_TO_MINIFIED',
            payload: chatId,
        })
    }, [])

    const maximalizeChat = useCallback((chatId) => {
        dispatch({
            type: 'REMOVE_FROM_MINIFIED',
            payload: chatId,
        })
    }, [])

    const clear = useCallback(() => {
        dispatch({
            type: 'CLEAR',
        })
    }, [])

    console.log({ activeConversations, minimalizedConversations })

    const { isLogged } = useContext(AuthContext)
    useEffect(() => {
        if (!isLogged) clear()
    }, [clear, isLogged])

    return (
        <MessengerContext.Provider
            value={{
                activeConversations,
                minimalizedConversations,
                addChat,
                removeChat,
                minimaliseChat,
                maximalizeChat,
                clear,
            }}
            {...props}
        />
    )
}

export { MessengerContext, MessengerProvider }
