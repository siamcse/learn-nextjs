'use client'
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ children }) => {
    const [client] = useState(new QueryClient());
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;