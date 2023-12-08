'use client'
import Form from '@/components/Form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

type DataTypes = {
    name: string,
    email: string,
    phone: string,
    address: string,
    state: string,
    zip: number,
    city: string,
    country: string
}
type ParamsType = {
    id: string
}
const EditCompany = ({ params }: ParamsType) => {
    const token = Cookies.get('token');
    const { register, handleSubmit } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: DataTypes) => {
            return axios.post(`http://192.168.0.186:3004/company`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
    })
    console.log(params.id);

    const handleFormSubmit = (data: DataTypes) => {
        console.log(data);
    }
    return (
        <div className='container mx-auto mt-3'>
            <Form
                title='Edit Company'
                handleSubmit={handleSubmit}
                handleFormSubmit={handleFormSubmit}
                isPending={isPending}
                register={register}
            />
            <Toaster />
        </div>
    );
};

export default EditCompany;