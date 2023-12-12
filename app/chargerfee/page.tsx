'use client'

import ButtonCN from '@/components/ButtonCN';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from '@phosphor-icons/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ToolTip from '@/components/ToolTip';
import { numberPattern, zeroToHundred } from '@/regex/regex';

type FeeTypes = {
    perCharger: string,
    minSessionFee: string,
    sessionFee: string
}


const feeSchema = z.object({
    perCharger: z.string().refine((value) => numberPattern.test(value), {
        message: "Invalid number",
    }).transform((value) => parseFloat(value)),
    sessionFee: z.string().refine((value) => zeroToHundred.test(value), {
        message: "Invalid number",
    }).transform((value) => parseFloat(value)),
    minSessionFee: z.string().refine((value) => numberPattern.test(value), {
        message: "Invalid number",
    }).transform((value) => parseFloat(value)),


})

const ChargerFee = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<FeeTypes>({
        resolver: zodResolver(feeSchema)
    }); const token = Cookies.get('token');
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token])

    const handleFee = (data: FeeTypes) => {
        console.log(data);
    }
    return (
        <div className='container mx-auto'>
            <form onSubmit={handleSubmit(handleFee)}>
                <h2 className='mt-4 text-2xl font-semibold'>Charger Fee</h2>
                <div className='mt-4 flex flex-col'>
                    <label className='flex gap-2 items-center' htmlFor="">
                        Per Charger Fee
                        <ToolTip
                            title='Per Charger Fee Rate'
                            tooltip='This percentage shows the charging session commission rate'>
                            <button><Info size={20} weight='fill' /></button>
                        </ToolTip>

                    </label>
                    <Controller
                        name="perCharger"
                        control={control}
                        render={({ field }) => (
                            <input
                                className='mt-1 border px-3 py-1 rounded focus:outline-none'
                                {...field}
                                type="text"
                                placeholder="Per Charger Fee"
                            />
                        )}
                    />
                    {errors?.perCharger?.message && (
                        <p className='text-red-500 text-sm'>{errors.perCharger.message}</p>
                    )}
                </div>
                <h2 className='mt-4 text-2xl font-semibold'>Session Fee</h2>
                <div className='flex gap-10'>
                    <div className='mt-4 flex flex-col'>
                        <label className='flex gap-2 items-center' htmlFor="">
                            Total Session Fee Rate (in %)
                            <ToolTip
                                title='Total Session Fee Rate'
                                tooltip='This percentage shows the charging session commission rate'>
                                <button><Info size={20} weight='fill' /></button>
                            </ToolTip>
                        </label>
                        <Controller
                            name="sessionFee"
                            control={control}
                            render={({ field }) => (
                                <input className='mt-1 border px-3 py-1 rounded focus:outline-none'
                                    {...field}
                                    type="text"
                                    placeholder="Session Fee"
                                />
                            )}
                        />
                        {errors?.sessionFee?.message && (
                            <p className='text-red-500 text-sm'>{errors.sessionFee.message}</p>
                        )}
                    </div>

                    <div className='mt-4 flex flex-col'>
                        <label className='flex gap-2 items-center' htmlFor="">
                            Minimum Session Fee
                            <ToolTip
                                title='Minimum Session Fee Rate'
                                tooltip='This percentage shows the charging session commission rate'>
                                <button><Info size={20} weight='fill' /></button>
                            </ToolTip>
                        </label>
                        <Controller
                            name="minSessionFee"
                            control={control}
                            render={({ field }) => (
                                <input className='mt-1 border px-3 py-1 rounded focus:outline-none'
                                    {...field}
                                    type="text"
                                    placeholder="Minimum Session Fee"
                                />
                            )}
                        />
                        {errors?.minSessionFee?.message && (
                            <p className='text-red-500 text-sm'>{errors.minSessionFee.message}</p>
                        )}
                    </div>
                </div>
                <ButtonCN type='submit' className='mt-2 bg-teal-600'>Submit</ButtonCN>
            </form>

        </div>
    );
};

export default ChargerFee;