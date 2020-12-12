import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";


const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
});

const cache = new InMemoryCache({
    typePolicies: {
        Image: {
            
        },
        Urls: {
            merge: true,
            keyFields: ["small"]
        }
    }
})

const setAuthorizationLink = setContext(() => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: setAuthorizationLink.concat(httpLink),
    cache,
});


export default function Apollo(props) {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}
