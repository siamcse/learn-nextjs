'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Cookies from 'js-cookie';
import { CompanyDetails } from '@/utils/types';
import { SpinnerGap } from '@phosphor-icons/react';

const CompanyPage = () => {
    const token = Cookies.get('token');
    const { data, error, isFetching } = useQuery({
        queryKey: ["company"],
        queryFn: async () => {
            const res: CompanyDetails = await axios.get('http://192.168.0.186:3004/company/657011d70a4a8dab31334092', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    })

    if (isFetching) {
        return <div className='min-h-screen flex justify-center items-center'>
            <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={50} color="black" />
        </div>
    }

    const companyInfo = [
        { name: 'Company Name', value: isFetching ? '-' : data?.company.name ?? '-' },
        { name: 'Phone Number', value: isFetching ? '-' : data?.company.phone ?? '-' },
        { name: 'Email Address', value: isFetching ? '-' : data?.company.email ?? '-' }
    ]
    const companyAddressInfo = [
        { name: 'Street Address', value: isFetching ? '-' : data?.address.address ?? '-' },
        { name: 'Country', value: isFetching ? '-' : data?.address.country ?? '-' },
        { name: 'Zip / Postal Code', value: isFetching ? '-' : data?.address.zip ?? '-' },
        { name: 'City', value: isFetching ? '-' : data?.address.city ?? '-' },
        { name: 'State', value: isFetching ? '-' : data?.address.state ?? '-' }
    ]
    const entityInfo = [
        { name: 'Company Name', value: isFetching ? '-' : data?.entity.name ?? '-' },
        { name: 'Phone Number', value: isFetching ? '-' : data?.entity.phone ?? '-' },
        { name: 'Email Address', value: isFetching ? '-' : data?.entity.email ?? '-' }
    ]
    const entityAddressInfo = [
        { name: 'Street Address', value: isFetching ? '-' : data?.entityAddress.address ?? '-' },
        { name: 'Country', value: isFetching ? '-' : data?.entityAddress.country ?? '-' },
        { name: 'Zip / Postal Code', value: isFetching ? '-' : data?.entityAddress.zip ?? '-' },
        { name: 'City', value: isFetching ? '-' : data?.entityAddress.city ?? '-' },
        { name: 'State', value: isFetching ? '-' : data?.entityAddress.state ?? '-' }
    ]
    const adminUser = [
        { name: 'First Name', value: isFetching ? '-' : data?.companyAdmin.firstName ?? '-' },
        { name: 'Last Name', value: isFetching ? '-' : data?.companyAdmin.lastName ?? '-' },
        { name: 'Email Address', value: isFetching ? '-' : data?.companyAdmin.email ?? '-' },
    ]
    const chargerFeeInfo = [
        { name: 'Per Charger Fee', value: isFetching ? '-' : data?.companyFee.perChargerFee ?? '-' },
        { name: 'Fee Duration Type', value: isFetching ? '-' : data?.companyFee.chargerFeeDurationType ?? '-' }
    ]
    const sessionFeeInfo = [
        { name: 'Total Session Fee Rate', value: isFetching ? '-' : data?.companyFee.sessionFeeRate ?? '-' },
        { name: 'Total Session Fee Rate', value: isFetching ? '-' : data?.companyFee.minimumSessionFee ?? '-' }
    ]
    return (
        <div className='container mx-auto mb-10 p-2'>
            <h1 className='text-center text-2xl font-bold'>Company Details</h1>
            <div className='mt-10 grid grid-cols-2'>
                {/* Company Information */}
                <h4 className='text-xl font-bold'>Company</h4>
                <div>
                    <p className='font-bold'>Primary Information</p>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        {
                            companyInfo.map((company, i) => <div key={i} className='mt-4'>
                                <p className='text-sm'>{company.name}</p>
                                <p>{company.value}</p>
                            </div>)
                        }

                    </div>
                    <p className='mt-4 font-bold'>Address Information</p>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        {
                            companyAddressInfo.map((addr, i) => <div key={i} className='mt-4'>
                                <p className='text-sm'>{addr.name}</p>
                                <p>{addr.value}</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className='mt-10 grid grid-cols-2'>
                {/* Entity Information */}
                <h4 className='text-xl font-bold'>Entity</h4>
                <div>
                    <p className='font-bold'>Primary Information</p>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        {
                            entityInfo.map((entity, i) => <div key={i} className='mt-4'>
                                <p className='text-sm'>{entity.name}</p>
                                <p>{entity.value}</p>
                            </div>)
                        }
                    </div>
                    <p className='mt-4 font-bold'>Address Information</p>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        {
                            entityAddressInfo.map((addr, i) => <div key={i} className='mt-4'>
                                <p className='text-sm'>{addr.name}</p>
                                <p>{addr.value}</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className='mt-10 grid grid-cols-2'>
                {/* Admin User */}
                <h4 className='text-xl font-bold'>Admin User</h4>
                <div>
                    <p className='font-bold'>Admin User Information</p>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        {
                            adminUser.map((user, i) => <div key={i} className='mt-4'>
                                <p className='text-sm'>{user.name}</p>
                                <p>{user.value}</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className='mt-10 grid grid-cols-2'>
                {/* Fee Information */}
                <h4 className='text-xl font-bold'>Fee</h4>
                <div>
                    <p className='font-bold'>Charger Fee</p>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        {
                            chargerFeeInfo.map(({ name, value }, i) => <div className='mt-4'>
                                <p className='text-sm'>{name}</p>
                                <p>{value}</p>
                            </div>)
                        }

                    </div>
                    <p className='mt-4 font-bold'>Session Fee</p>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        {
                            sessionFeeInfo.map(({ name, value }, i) => <div className='mt-4'>
                                <p className='text-sm'>{name}</p>
                                <p>{value}</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;