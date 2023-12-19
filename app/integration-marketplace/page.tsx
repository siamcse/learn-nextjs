'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Loader from '@/components/Loader';
import Image from 'next/image';
import ButtonCN from '@/components/ButtonCN';

const MarketPlacePage = () => {
    const token = Cookies.get('token');
    const [query, setQuery] = useState('');
    const [activeBtn, setActiveBtn] = useState('')

    const { data: types, isFetching: typesFetching } = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/integration-marketplace/types`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    });

    const { data, isFetching } = useQuery({
        queryKey: ['token', types, query],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/integration-marketplace?query=${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    })

    if (typesFetching) {
        return <Loader size={32} />
    }

    return (
        <div className='container mx-auto mt-5'>
            <div className='flex gap-4 border-b-2'>
                <button className={`${query === '' ? "border-b-2 border-teal-700" : "pb-[2px]"} capitalize`} onClick={() => setQuery('')}>All</button>
                {
                    types?.map((item: string, i: number) =>
                        <button
                            key={i}
                            className={`${query === item ? "border-b-2 border-teal-700" : "pb-[2px]"} capitalize`}
                            onClick={() => setQuery(item)}
                        >
                            {item}
                        </button>)
                }
            </div>
            <div className='mt-10 flex gap-4'>
                {
                    data?.map((item: any) => <div key={item._id} className='border rounded shadow'>
                        <div className='p-5'>
                            <div className='relative h-[100px] w-full'>
                                <Image
                                    className='object-contain'
                                    fill
                                    src={item.logoUrl}
                                    alt=''
                                />
                            </div>
                            <h3 className='font-bold capitalize'>{item.type} Channel</h3>
                        </div>
                        <hr />
                        <div className='p-5'>
                            <Link href={`/integration-marketplace/${item._id}`}><ButtonCN className="bg-teal-700 w-full px-4">Details</ButtonCN></Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MarketPlacePage;