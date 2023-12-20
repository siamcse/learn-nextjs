'use client'
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import Loader from '@/components/Loader';

export const QueryProviders = ({ children }: any) => {
    const [client] = useState(new QueryClient());
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

export const ReduxProviders = ({ children }: any) => {
    let persistor = persistStore(store);
    const loader = <Loader size={32} />
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}