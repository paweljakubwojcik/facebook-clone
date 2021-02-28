import React from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { offsetLimitPagination, relayStylePagination } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

import dayjs from 'dayjs'

const httpLink = createUploadLink({
    uri: 'http://localhost:5000/graphql',
})

const cache = new InMemoryCache({
    typePolicies: {
        Urls: {
            merge: true,
        },
        Post: {
            merge: true,
        },
        Query: {
            fields: {
                posts: {
                    keyArgs: ['userId'],

                    merge(existing, incoming, { readField }) {
                        const merged = { ...existing }
                        incoming.forEach((item) => {
                            merged[readField('id', item)] = item
                        })

                        return merged
                    },

                    // Return all items stored so far, to avoid ambiguities
                    // about the order of the items.
                    read(existing, { readField }) {
                        if (existing) {
                            let sorted = Object.values(existing)
                            sorted.sort((b, a) => {
                                return (
                                    dayjs(readField('createdAt', a)).unix() -
                                    dayjs(readField('createdAt', b)).unix()
                                )
                            })
                            console.log({ existing, sorted })
                            return sorted
                        }
                        return false
                    },
                },

                users: offsetLimitPagination(),
            },
        },
        User: {
            merge: true,
            fields: {
                notifications: offsetLimitPagination(),
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
