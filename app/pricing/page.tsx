'use client'
import { pricing } from '@/utils/pricing';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ChargerList from './_components/ChargerList';

const PricingPage = () => {
    const token = Cookies.get('token');
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token])

    return (
        <div className='px-4 mt-4 p-2'>
            <h1 className='text-2xl font-bold'>Pricing</h1>
            {
                pricing.pricings.map(data => <div key={data._id} className="w-full border rounded-t-lg">
                    <div className='flex justify-between px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-gray-700 tracking-wider'>
                        <h1 className='font-bold'>{data.ruleName}</h1>
                        <p>Details</p>
                    </div>
                    {
                        data.locations.map(location => <div key={location._id} className='grid grid-cols-2 pl-5 md:pl-10 p-3  border-b border-gray-200'>
                            <div className=''>
                                <p className='font-semibold opacity-50'>Location</p>
                                <h3 className='mt-1 font-medium text-sm uppercase'>{location.name}</h3>
                            </div>
                            <div>
                                <p className='font-semibold opacity-50'>Chargers</p>
                                <ChargerList chargers={location.chargers} />
                            </div>
                        </div>)
                    }
                </div>)
            }

        </div>
    );
};

export default PricingPage;