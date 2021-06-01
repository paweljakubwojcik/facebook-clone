import React from 'react'

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    split,
    /* createHttpLink */
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from '@apollo/client/link/ws'

import cursorPagination from './Util/cursorPagination'
import copyAuthHeaderMiddleware from './Util/ApolloMiddleware/copyAuthHeaderMiddleware'

// TODO: setup authetication over subscriptions

const httpLink = createUploadLink({
    uri: 'http://localhost:5000',
})

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:5000/subscriptions',
    options: {
        reconnect: true,
    },
    onDisconnected: () => {
        console.log('disconnected')
    },
})

wsLink.subscriptionClient.use([copyAuthHeaderMiddleware])

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink
)

const cache = new InMemoryCache({
    typePolicies: {
        Post: {
            merge: true,
            fields: {
                comments: {
                    keyArgs: ['postId'],
                    ...cursorPagination,
                },
            },
        },
        Reaction: {
            merge: true,
        },
        Query: {
            merge: true,
            fields: {
                posts: {
                    keyArgs: ['userId'],
                    ...cursorPagination,
                },
                searchForUser: {
                    keyArgs: false,
                    merge: false,
                },
            },
        },
        User: {
            merge: true,
            fields: {
                notifications: {
                    keyArgs: ['userId'],
                    ...cursorPagination,
                },
                info: {
                    merge: true,
                },
                conversations: {
                    keyArgs: ['userId'],
                    ...cursorPagination,
                },
            },
        },
        Conversation: {
            merge: true,
            fields: {
                messages: {
                    keyArgs: ['userId'],
                    ...cursorPagination,
                },
            },
        },
        Image: {
            merge: true,
        },
        Urls: {
            merge: true,
        },
    },
})

const setAuthorizationLink = setContext(() => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    link: setAuthorizationLink.concat(splitLink),
    cache,
})

export default function Apollo(props) {
    return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
