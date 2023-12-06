'use client'
import React from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SpinnerGap } from '@phosphor-icons/react';

const AllCompanyPage = () => {
    const token = Cookies.get('token');
    const { data, error, isFetching } = useQuery({
        queryKey: ["company"],
        queryFn: async () => {
            const res = await axios.get('http://192.168.0.186:3004/company?page=1&size=10&query=', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    })

    console.log(data?.companies);

    if (isFetching) {
        return <div className='min-h-screen flex justify-center items-center'>
            <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={50} color="black" />
        </div>
    }
    return (
        <div className='container mx-auto'>
            <h1 className='text-center font-bold text-3xl '>All Company</h1>
            <table class="w-full border rounded-lg mt-10">
                <thead>
                    <tr>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Company Name</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Email</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Phone</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.companies.map(company => <tr>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.name}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.email}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.phone}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>Details</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllCompanyPage;