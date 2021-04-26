import React, { createContext, useState, useCallback } from 'react'

const MessengerContext = createContext({
    activeConversations: [],
})

function MessengerProvider(props) {
    const [activeConversations, setActiveConversations] = useState([1, 2])

    const addChat = useCallback((chatId) => {
        setActiveConversations((prev) => [...prev, chatId])
    }, [])

    const removeChat = useCallback((chatId) => {
        setActiveConversations((prev) => prev.filter((id) => id !== chatId))
    }, [])

    return (
        <MessengerContext.Provider
            value={{ activeConversations, addChat, removeChat }}
            {...props}
        />
    )
}

export { MessengerContext, MessengerProvider }
