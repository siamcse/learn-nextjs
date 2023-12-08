'use client'
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';

type DataTypes = {
    name:string,
    email:string,
    phone:string,
    address:string,
    state:string,
    zip:number,
    city:string,
    country:string
}

const CreateCompanyPage = () => {
    const token = Cookies.get('token');
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: (data:DataTypes) => {
            return axios.post(`http://192.168.0.186:3004/company`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
    })

    const handleFormSubmit = (data: DataTypes) => {
        console.log(data);
        mutate(data, {
            onSuccess: (res) => {
                console.log(res);
                router.push('/allcompany?page=1&size=10&query=');
            },
            onError: (err) => {
                console.log(err);
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data.message);
                }
            }
        })

    }
    return (
        <div className='container mx-auto mt-3'>
            <Form
                title='Create Company'
                handleSubmit={handleSubmit}
                handleFormSubmit={handleFormSubmit}
                isPending={isPending}
                register={register}
            />
            <Toaster />
        </div>
    );
};

export default CreateCompanyPage;