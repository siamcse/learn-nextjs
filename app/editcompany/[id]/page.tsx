'use client'
import Form from '@/components/Form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SpinnerGap } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FieldType = "company" | "company.name" | "company.email" | "company.phone" | "company.address" | "company.state" | "company.zip" | "company.city" | "company.country"


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
const EditCompany = ({ params }: { params: { id: string } }) => {
    const token = Cookies.get('token');
    const id = params.id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<DataTypes>({
        resolver: zodResolver(companySchema)
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    console.log(token);

    const { mutate, isPending } = useMutation({
        mutationFn: (editedCompany: any) => {
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
                const fieldValues = {
                    'name': res.data.company.name,
                    'email': res.data.company.email,
                    'phone': res.data.company.phone,
                    'address': res.data.address.address,
                    'city': res.data.address.city,
                    'country': res.data.address.country,
                    'zip': res.data.address.zip,
                    'state': res.data.address.state,
                }
                Object.entries(fieldValues).forEach(([filedName, value]: FieldType[]) => {
                    setValue(filedName, value);
                })
                setLoading(false);
            })
            .catch(e => {
                console.log(e.message);
                toast.error("e.message");
                setLoading(false);
            })

    }, [id])

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token])

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
                errors={errors}
            />
            <Toaster />
        </div>
    );
};

export default EditCompany;