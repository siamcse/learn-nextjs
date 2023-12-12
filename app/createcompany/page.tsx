'use client'
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import Form from '@/components/Form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type DataTypes = {
    name: string,
    email: string,
    phone: string,
    address: string,
    state: string,
    zip: string,
    city: string,
    country: string
}

type ZipCodeType = {
    data: {
        zip: string
        latitude: number
        longitude: number
        city: string
        state: string
        country: string
    }
}

const CreateCompanyPage = () => {
    const companySchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email(),
        phone: z.string().includes("+"),
        address: z.string().min(1, { message: "Address is required" }),
        state: z.string().min(1, { message: "State is required" }),
        zip: z.string().min(5, { message: "Zip must be 5 digits" }),
        city: z.string().min(1, { message: "City is required" }),
        country: z.string().min(1, { message: "Country is required" })

    })
    const token = Cookies.get('token');
    const router = useRouter();
    const [zipId, setZipId] = useState<number>();

    if(!token){
        redirect('/login');
    }

    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<DataTypes>({
        resolver: zodResolver(companySchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: DataTypes) => {
            return axios.post(`http://192.168.0.186:3004/company`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
    })

    const { data,status } = useQuery({
        queryKey: [zipId],
        queryFn: () => {
            if (zipId) {
                return axios.get(`http://192.168.0.186:3004/geo/zip/${zipId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }
            else {
                return null;
            }
        },
        enabled: !!zipId
    });
    useEffect(() => {
        if (zipId) {
            setValue("country", data?.data.country);
            setValue("state", data?.data.state);
            setValue("city", data?.data.city);
        }
    }, [zipId, data])

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token])

    const handleFormSubmit = (data: DataTypes) => {
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

    const handleZipField = (e:any) => {
        e.preventDefault();
        const value = e.target.value;
        setZipId(value);
    }
    return (
        <div className='container mx-auto my-3'>
            <Form
                title='Create Company'
                handleSubmit={handleSubmit}
                handleFormSubmit={handleFormSubmit}
                isPending={isPending}
                register={register}
                errors={errors}
                handleZipField={handleZipField}
            />
            {/* <button onSubmit={handleZipField}>Get Field</button> */}
            <Toaster />
        </div>
    );
};

export default CreateCompanyPage;