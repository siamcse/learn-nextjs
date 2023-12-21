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
import Pagination from '@/components/Pagination';

const AllCompanyPage = () => {
    const searchParams = useSearchParams();
    const getPage = searchParams.get('page');
    const getSize = searchParams.get('size');
    const getQuery = searchParams.get('query');
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(Number(getPage));
    const [searchValue, setSearchValue] = useState('');
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token])

    const { data, error, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["company", currentPage, getPage, getSize, searchValue],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/company?page=${currentPage}&size=${getSize}&query=${searchValue}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    })
    console.log("🚀 ~ file: page.jsx:42 ~ AllCompanyPage ~ data:", data)
    const totalCount = Number(data?.count);
    console.log("🚀 ~ file: page.jsx:43 ~ AllCompanyPage ~ totalCount:", totalCount)
    const totalPage = Math.ceil(totalCount / (Number(getSize) ?? 10));
    console.log("🚀 ~ file: page.jsx:43 ~ AllCompanyPage ~ totalPage:", totalPage)

    useEffect(() => {
        if (Math.ceil(data?.count / Number(getSize)) < currentPage || currentPage < 1) {
            setCurrentPage(1);
            router.push(`/allcompany?page=1&size=10&query=${searchValue}`);
        }


    }, [currentPage, getSize, data?.count, searchValue])

    //page numbers show
    const totalPageNumbers = 6;

    const handlePagination = () => {

    }

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.search.value;
        console.log(value);
        setSearchValue(value ?? '');
        router.push(`/allcompany?page=${currentPage}&size=${getSize}&query=${value}`);
    }

    if (isFetching) {
        return <Loader size={32}></Loader>
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
            {/* <div className='my-5 flex justify-between items-center'>
                <span className='block'>Current Page: {Number(page)}</span>

                <div className='flex items-center'>
                    <Link
                        className='flex items-center'
                        href={{
                            pathname: '/allcompany',
                            query: { page: page - 1, size: 10 },
                        }}>
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                            disabled={page === 1}
                        >
                            <CaretLeft size={20} />
                        </button>
                    </Link>
                    <div className='flex gap-2 items-center'>
                        {
                            totalPage ?
                                Array(totalPage)?.fill(null).map((_, i) => (
                                    <Link
                                        key={i}
                                        className={`flex items-center ${page === i + 1 ? 'bg-teal-600 px-2 py-1 rounded-md text-white' : ''}`}
                                        href={{
                                            pathname: '/allcompany',
                                            query: { page: i + 1, size: 10 },
                                        }}>
                                        <button
                                            onClick={() => setPage(i)}
                                            disabled={totalPage <= page}
                                        >
                                            {i + 1}
                                        </button>
                                    </Link>
                                ))
                                : null
                        }
                    </div>
                    <Link
                        className='flex items-center'
                        href={{
                            pathname: '/allcompany',
                            query: { page: page + 1, size: 10 },
                        }}>
                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={totalPage <= page}
                        >
                            <CaretRight size={20} />
                        </button>
                    </Link>
                </div>
            </div> */}

            <div className='my-10 flex justify-center'>
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={getSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default AllCompanyPage;