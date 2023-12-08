'use client'
import ButtonCN from '@/components/ButtonCN';
import Input from '@/components/Input';
import { CreateCompany } from '@/utils/types';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { SpinnerGap } from '@phosphor-icons/react';
import { redirect, useRouter } from 'next/navigation';
import InputField from '@/components/InputField';

const CreateCompanyPage = () => {
    const token = Cookies.get('token');
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => {
            return axios.post(`http://192.168.0.186:3004/company`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
    })

    const handleFormSubmit = (data: any) => {
        console.log(data);
        mutate(data, {
            onSuccess: (res) => {
                console.log(res);
                router.push('/allcompany');
            },
            onError: (err) => {
                console.log(err);
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data.message);
                }
            }
        })

    }
    console.log(isPending);
    return (
        <div className='container mx-auto mt-3'>
            <form className='px-5' onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='flex justify-between my-10'>
                    <h1 className='text-3xl font-bold text-center'>Create Company</h1>
                    <div>
                        {/* <ButtonCN className='bg-gray-100 text-black border mr-2 hover:bg-gray-200'>Cancel</ButtonCN> */}
                        <ButtonCN disabled={isPending} type="submit" className={`bg-teal-700 hover:bg-teal-800 ${isPending ? 'opacity-60' : ''}`}>
                            Submit{" "}
                            {
                                isPending ? <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={20} color="white" /> : null
                            }
                        </ButtonCN>
                    </div>
                </div>
                <div>
                    <h3 className='text-xl font-semibold'>Primary Information</h3>
                    <div className='mt-4'>
                        <div className='mt-4 flex flex-col'>
                            <InputField
                                className=''
                                label='Company Name'
                                name='name'
                                register={register}
                                type='text'
                            />
                        </div>
                        <div className='mt-4 md:flex gap-6'>
                            <div className='flex flex-col'>
                                <InputField
                                    className='md:w-[430px]'
                                    label='Email Address'
                                    name='email'
                                    register={register}
                                    type='email'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <InputField
                                    className='md:w-[314px]'
                                    label='Phone Number'
                                    name='phone'
                                    register={register}
                                    type='text'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <h3 className='text-xl font-semibold'>Address Information</h3>
                    <div className='mt-4'>
                        <div className='md:flex gap-5'>
                            <div className='mt-4 flex flex-col'>
                                <InputField
                                    className=''
                                    label='Country'
                                    name='country'
                                    register={register}
                                    type='text'
                                />
                            </div>
                            <div className='mt-4 flex flex-col'>
                                <InputField
                                    className=''
                                    label='Zip / Postal Code'
                                    name='zip'
                                    register={register}
                                    type='text'
                                />
                            </div>
                            <div className='mt-4 flex flex-col'>
                                <InputField
                                    className=''
                                    label='City'
                                    name='city'
                                    register={register}
                                    type='text'
                                />
                            </div>
                        </div>
                        <div className='mt-4 md:flex gap-6'>
                            <div className='flex flex-col'>
                                <InputField
                                    className='md:w-[430px]'
                                    label='Street Address'
                                    name='address'
                                    register={register}
                                    type='text'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <InputField
                                    className='md:w-[314px]'
                                    label='State / Province'
                                    name='state'
                                    register={register}
                                    type='text'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </form>
            <Toaster />
        </div>
    );
};

export default CreateCompanyPage;