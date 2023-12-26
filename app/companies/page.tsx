'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import ButtonCN from '@/components/ButtonCN';
import Loader from '@/components/Loader'
import axiosInterceptorInstance from '@/axios/axiosInterceptorInstance';
import Pagination from './_components/Pagination';
import { PencilSimple } from '@phosphor-icons/react';

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
            const res = await axiosInterceptorInstance.get(`/company?page=${currentPage}&size=${getSize}&query=${searchValue}`)
            return res.data;
        }
    })
    const totalCount = Number(data?.count);
    const totalPage = Math.ceil(totalCount / (Number(getSize) ?? 10));

    useEffect(() => {
        if (Math.ceil(data?.count / Number(getSize)) < currentPage || currentPage < 1) {
            setCurrentPage(1);
            router.push(`/companies?page=1&size=10&query=${searchValue}`);
        }


    }, [currentPage, getSize, data?.count, searchValue])

    const handleSearch = (e: any) => {
        e.preventDefault();
        const value = e.target.search.value;
        console.log(value);
        setSearchValue(value ?? '');
        router.push(`/companies?page=${currentPage}&size=${getSize}&query=${value}`);
    }

    if (isFetching) {
        return <Loader size={32}></Loader>
    }

    const handleEdit = (id: string) => {
        router.push(`/editcompany/${id}`);
    }

    return (
        <div className='container mx-auto mt-3'>
            <h1 className='text-center font-bold text-3xl '>All Company</h1>
            <form onSubmit={handleSearch} className='py-3 px-3 flex bg-white rounded shadow shadow-gray'>
                <input defaultValue={getQuery ?? ''} name='search' type="text" className='px-3 py-1 outline-none w-full' placeholder='Search' />
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
                        data?.companies.map((company: any) => <tr key={company._id}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.name}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.email}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{company.phone}</td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'><ButtonCN onClick={() => handleEdit(company._id)} className='bg-teal-700'><PencilSimple size={20} /></ButtonCN></td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>Details</td>
                        </tr>)
                    }
                </tbody>
            </table>

            <div className='my-10 flex justify-center'>
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={getSize}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default AllCompanyPage;