'use client'
import Form from '@/components/Form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { SingleCompanyType } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { SpinnerGap } from '@phosphor-icons/react';

type DataTypes = {
    company: {
        name: string,
        email: string,
        phone: string,
        address: string,
        state: string,
        zip: number,
        city: string,
        country: string
    }
}

const EditCompany = ({ params }: { params: { id: string } }) => {
    const token = Cookies.get('token');
    const id = params.id;
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: (editedCompany: DataTypes) => {
            return axios.put(`http://192.168.0.186:3004/company/${id}`, editedCompany, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    })

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.0.186:3004/company/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setValue('name', res.data.company.name)
                setValue('email', res.data.company.email)
                setValue('phone', res.data.company.phone)
                setValue('country', res.data.address.country)
                setValue('city', res.data.address.city)
                setValue('zip', res.data.address.zip)
                setValue('state', res.data.address.state)
                setValue('address', res.data.address.address)
                setLoading(false);
            })
            .catch(e => {
                console.log(e)
                setLoading(false);
            })

    }, [id])




    const handleFormSubmit = (data: DataTypes) => {
        console.log(data);
        const editedCompany = {
            company: {
                ...data
            }
        }
        console.log(editedCompany);
        mutate(editedCompany, {
            onSuccess: (res) => {
                console.log(res)
                router.push('/allcompany')
            },
            onError: (err) => {
                console.log(err);
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data.message);
                }
            }
        })
    }

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>
            <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={50} color="black" />
        </div>
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