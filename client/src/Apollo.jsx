import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache()
});

export default function Apollo(props) {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}
