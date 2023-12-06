'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import axios from 'axios';
import { SpinnerGap } from "@phosphor-icons/react";
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@/components/Modal';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const authUsername = "650307ae3b81447e5d793425";
    const authPassword = "ff427eeb-f60a-46c0-995e-7f1daa355eb8";
    const base64Credentials = btoa(authUsername + ":" + authPassword);

    const { mutate, isPending, failureReason } = useMutation({
        mutationFn: (authInfo) => {
            return axios.post('http://192.168.0.186:3004/auth/signin', authInfo, {
                headers: {
                    Authorization: `Basic ${base64Credentials}`,
                }
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setLoading(true);

        const authInfo = {
            grantType: "password",
            email: email,
            password: password,
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTAyYmEwNDg4NjQxNzUxMDE4NmFkNmEiLCJ1c2VyVHlwZSI6ImFkbWluIiwiY2xpZW50SWQiOiI2NTAzMDdhZTNiODE0NDdlNWQ3OTM0MjUiLCJlbWFpbCI6IjZzZW5zZWV2QGdtYWlsLmNvbSIsImlhdCI6MTY5NTM1OTE3OSwiZXhwIjoxNjk1MzU5Nzc5fQ.x6tNWy3Hz1BUM_PS0jpBwSWm7RHWtNks3o-UuJCUMcI"
        }

        mutate(authInfo, {
            onSuccess: (data) => {
                console.log(data.data.auth.accessToken);
                Cookies.set('token',data.data.auth.accessToken);
                setLoading(false)
            },
            onError: (e) => {
                toast.error(e.response.data.message);
                setLoading(false);
            }
        })
    }
    const token = Cookies.get('token');
    console.log(token);
    const handleForgotPassword = () => {
        setShowModal(true);

    }
    return (
        <section className='bg-[#f8f9fb] h-screen flex justify-center items-center'>
            <div>
                <div className='pb-9 flex flex-col items-center'>
                    <Image
                        className='pb-4'
                        src="/images/EvLogo.png"
                        alt='6sense'
                        width={120}
                        height={36}
                    />
                    <h1 className="text-center text-[32px] font-bold">Sign in to your account</h1>
                </div>
                <form onSubmit={handleSubmit} className='md:w-[450px] mx-2 md:mx-0 p-3 md:p-8 shadow-md rounded-2xl bg-[#ffffff]'>
                    <div className='pb-3'>
                        <label className='pb-2 text-sm font-medium block'>Email Address</label>
                        <input name='email' className='w-full border px-3 py-2 rounded-lg focus:outline-none' type="email" placeholder="Email Address" />
                    </div>
                    <div className=''>
                        <label className='pb-2 text-sm font-medium block'>Password</label>
                        <div className='flex justify-between items-center w-full border  rounded-lg'>
                            <input name='password' className='w-full px-3 py-2 rounded-lg focus:outline-none' type={`${showPassword ? 'text' : 'password'}`} placeholder="Password" />
                            <div onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>
                                    </> :
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"></path></svg>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <p className='flex justify-end items-end text-sm text-[#17494d] font-medium mt-6 cursor-pointer' onClick={handleForgotPassword}>Forgot password?</p>
                    <button type='submit' className='w-full mt-6 py-3 flex items-center justify-center gap-2 bg-[#17494d] text-white rounded-lg '>
                        Sign In
                        {
                            loading ? <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={20} color="white" /> : null
                        }
                    </button>
                </form>
            </div>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <Toaster position="top-right" />
        </section>
    );
};

export default LoginPage;