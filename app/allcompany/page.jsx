'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SpinnerGap, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ButtonCN from '@/components/ButtonCN';
import { PencilSimple } from '@phosphor-icons/react';
import Loader from '@/components/Loader'

const AllCompanyPage = () => {
    const searchParams = useSearchParams();
    const getPage = searchParams.get('page');
    const getSize = searchParams.get('size');
    const getQuery = searchParams.get('query');
    const router = useRouter();

    const [page, setPage] = useState(Number(getPage));
    const [searchValue, setSearchValue] = useState('');
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token])

    const { data, error, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["company", page, getPage, getSize, searchValue],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/company?page=${page}&size=${getSize}&query=${searchValue}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    })
    console.log(data);
    useEffect(() => {
        if (Math.ceil(data?.count / Number(getSize)) < page || page < 1) {
            setPage(1);
            router.push(`/allcompany?page=1&size=10&query=${searchValue}`);
        }


    }, [page, getSize, data?.count, searchValue])

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.search.value;
        console.log(value);
        setSearchValue(value ?? '');
        router.push(`/allcompany?page=${page}&size=${getSize}&query=${value}`);
    }

    if (isFetching) {
        return <Loader></Loader>
    }

    const handleEdit = (id) => {
        router.push(`/editcompany/${id}`);
    }
    return (
        <div className='container mx-auto mt-3'>
            <h1 className='text-center font-bold text-3xl '>All Company</h1>
            <form onSubmit={handleSearch} className='py-3 px-3 flex bg-white rounded shadow shadow-gray'>
                <input defaultValue={getQuery} name='search' type="text" className='px-3 py-1 outline-none w-full' placeholder='Search' />
                <ButtonCN type='submit' className='bg-teal-700'>Search</ButtonCN>
            </form>
            <table className="w-full border rounded-lg mt-10">
                <thead>
                    <tr>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Company Name</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Email</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Phone</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100'></th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.companies.map(company => <tr key={company._id}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.name}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.email}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.phone}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'><ButtonCN onClick={() => handleEdit(company._id)} className='bg-teal-700'><PencilSimple size={20} /></ButtonCN></td>
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