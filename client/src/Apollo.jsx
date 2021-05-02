import React from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache /* createHttpLink */ } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

import cursorPagination from './Util/cursorPagination'

const httpLink = createUploadLink({
    uri: 'http://localhost:5000',
})

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
            },
        },
        Conversation: {
            merge: true,
            fields: {
                messages: {
                    ...cursorPagination,
                },
            },
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
    link: setAuthorizationLink.concat(httpLink),
    cache,
})

export default function Apollo(props) {
    return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
