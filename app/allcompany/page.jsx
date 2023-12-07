'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SpinnerGap, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/button';

const AllCompanyPage = () => {
    const searchParams = useSearchParams();
    const getPage = searchParams.get('page');
    const getSize = searchParams.get('size');
    const router = useRouter();

    const [page, setPage] = useState(Number(getPage));
    const token = Cookies.get('token');
    console.log(getPage, getSize);

    const { data, error, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["company", page, getPage, getSize],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/company?page=${page}&size=${getSize}&query=`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    })

    useEffect(() => {
        console.log(Math.ceil(data?.count / Number(getSize)));
        if (Math.ceil(data?.count / Number(getSize)) < page || page < 1) {
            setPage(1);
            router.push('/allcompany?page=1&size=10');
        }
    }, [page, getSize, data?.count])

    console.log(data);

    if (isFetching) {
        return <div className='min-h-screen flex justify-center items-center'>
            <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={50} color="black" />
        </div>
    }
    return (
        <div className='container mx-auto mt-3'>
            <h1 className='text-center font-bold text-3xl '>All Company</h1>
            <div className='flex justify-center mt-4'>
                <input type="text" placeholder='Search' />
                <Button className='rounded-lg'>Search</Button>
            </div>
            <table className="w-full border rounded-lg mt-10">
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
                        data?.companies.map(company => <tr key={company._id}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.name}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.email}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.phone}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>Details</td>
                        </tr>)
                    }
                </tbody>
            </table>
            <div className='my-5 flex justify-between'>
                <span className='block'>Current Page: {Number(page)}</span>
                <div>
                    <Link
                        href={{
                            pathname: '/allcompany',
                            query: { page: page - 1, size: 10 },
                        }}>
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                            disabled={page === 1}
                        >
                            <CaretLeft size={32} />
                        </button>
                    </Link> {' '}
                    <Link href={{
                        pathname: '/allcompany',
                        query: { page: page + 1, size: 10 },
                    }}>
                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={Math.ceil(data?.count / Number(getSize)) <= page}
                        >
                            <CaretRight size={32} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllCompanyPage;