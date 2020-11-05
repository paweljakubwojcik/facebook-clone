import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache()
});

export default function Apollo() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}
