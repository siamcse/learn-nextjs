'use client'
import axiosInterceptorInstance from '@/axios/axiosInterceptorInstance';
import React, { useEffect } from 'react';

const AxiosTest = () => {
    const getData = async () => {
        const result = await axiosInterceptorInstance.get('/integration-marketplace/65253179d19533f70a8bbbe1');
        console.log("🚀 ~ file: page.tsx:8 ~ getData ~ result:", result.data)
    }
    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-3xl'>Axios Interceptors</h1>
            <button onClick={getData}>Get Data</button>
        </div>
    );
};

export default AxiosTest;