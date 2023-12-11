'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ButtonCN from './ButtonCN';
import Cookies from 'js-cookie';
import { redirect, useRouter } from 'next/navigation';

const Navbar = () => {
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        setToken(Cookies.get('token') ?? '');
    }, [Cookies.get('token'), token])

    console.log(token);

    const handleLogOut = () => {
        Cookies.remove('token', { path: '/' });
        router.push('/login');
        console.log(token);
    }
    return (
        <div className='container mx-auto my-3 flex justify-between'>
            <Link href='/'><ButtonCN className='bg-teal-600 hover:bg-white hover:border hover:text-black'>Home</ButtonCN></Link>
            {
                token ? <ButtonCN onClick={handleLogOut} className='bg-teal-600 hover:bg-white hover:border hover:text-black'>LogOut</ButtonCN> : null
            }
        </div>
    );
};

export default Navbar;