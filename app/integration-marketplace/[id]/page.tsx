'use client'
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Loader from '@/components/Loader';
import ButtonCN from '@/components/ButtonCN';
import { Link } from '@phosphor-icons/react';
import InputField from '@/components/InputField';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { fieldRequired } from '@/globalVariables';
import { create } from 'domain';
import { zodResolver } from '@hookform/resolvers/zod';

type MarketPlaceType = {
    _id: string
    status: string
    name: string
    type: string
    details: string
    summary: string
    about: string
    provider_short_code: string
    logoUrl: string
    inputFields: InputFieldType[]
    __v: number
    created_at: string
    updated_at: string
    integration: any
}

type InputFieldType = {
    key: string
    name: string
    type: string
}

const createSchema = (inputFields: InputFieldType[]) => {
    const schemaObject: any = {};
    inputFields?.forEach((field) => {
        schemaObject[field.key] = z.string({ required_error: fieldRequired }).min(1, { message: fieldRequired })
    })
    return schemaObject;
}


const MarketPlaceDetails = ({ params }: { params: { id: string } }) => {
    const token = Cookies.get('token');
    const id = params.id;
    const [btnText, setBtnText] = useState('Connect');

    const { data, isFetching } = useQuery({
        queryKey: ['token', id],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/integration-marketplace/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data as MarketPlaceType;
        }
    })
    const dynamicZodSchema = createSchema(data?.inputFields);

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<any>({
        resolver: zodResolver(createSchema(data?.inputFields))
    });

    const formSubmit = (data: any) => {
        console.log("🚀 ~ file: page.tsx:56 ~ formSubmit ~ data:", data);

    }

    if (isFetching) {
        return <Loader size={32} />
    }
    console.log("errors", errors);
    console.log("values", getValues());

    return (
        <form onSubmit={handleSubmit(formSubmit)} className='container mx-auto my-10'>
            <div className='flex justify-between items-center'>
                <div>
                    <div className='relative h-[100px] w-[200px] '>
                        {
                            data?.logoUrl ?
                                <Image
                                    className='object-contain'
                                    fill
                                    src={data?.logoUrl}
                                    alt=''
                                />
                                : null
                        }
                    </div>
                    <p className='opacity-60 mt-2'>
                        <span className='capitalize'>{data?.type}</span> channel by
                        <span className='capitalize'> {data?.name}</span>
                    </p>
                </div>
                <ButtonCN
                    type={btnText === 'Verify' ? "submit" : "button"}
                    onClick={() => setBtnText('Verify')}
                    className="bg-teal-700 flex gap-2 items-center"
                >
                    {btnText}
                    <Link size={20} color="#faebeb" />
                </ButtonCN>
            </div>
            <div className=' my-10'>
                {
                    btnText === 'Verify' ?
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border p-5 rounded'>
                            {
                                data?.inputFields.map(field => <div
                                    key={field.key}
                                    className='my-2 flex flex-col'
                                >
                                    <InputField
                                        className=''
                                        errors={errors}
                                        label={field.name}
                                        name={field.key}
                                        register={register}
                                        type={field.type}

                                    />
                                </div>)
                            }
                        </div>
                        :
                        <></>
                }
            </div>
            <div className='mt-5 leading-normal'>
                <p className='font-semibold'>About</p>
                <p className='opacity-60 pt-2'>{data?.about}</p>

                <p className='font-semibold mt-10'>Details</p>
                <p className='opacity-60 pt-2'>{data?.details}</p>
            </div>
        </form>
    );
};

export default MarketPlaceDetails;