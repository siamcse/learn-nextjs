'use client'

import ButtonCN from '@/components/ButtonCN';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FeeTypes = {
    perCharger: number,
    minSessionFee: number,
    sessionFee: number,
    type: string
}

const feeSchema = z.object({
    perCharger: z.number().nonnegative(),
    minSessionFee: z.number().nonnegative(),
    sessionFee: z.number().nonnegative(),
    type: z.string()
})

const ChargerFee = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFee = (data) => {
        console.log(data);
    }
    return (
        <div className='container mx-auto'>
            <form onSubmit={handleSubmit(handleFee)} action="">
                <h2 className='mt-4 text-2xl font-semibold'>Charger Fee</h2>
                <div className='flex gap-10'>
                    <div className='mt-4 flex flex-col'>
                        <label htmlFor="">Per Charger Fee</label>
                        <input {...register("perCharger")} className='mt-1 border px-3 py-1 rounded focus:outline-none' type="number" />
                    </div>
                    <div className='mt-4 flex flex-col'>
                        <label htmlFor="">Fee Duration Type</label>
                        <input {...register("type")} className='mt-1 border px-3 py-1 rounded focus:outline-none' type="text" />
                    </div>
                </div>
                <h2 className='mt-4 text-2xl font-semibold'>Session Fee</h2>
                <div className='flex gap-10'>
                    <div className='mt-4 flex flex-col'>
                        <label htmlFor="">Total Session Fee Rate (in %)</label>
                        <input {...register("sessionFee")} className='mt-1 border px-3 py-1 rounded focus:outline-none' type="number" />
                    </div>
                    <div className='mt-4 flex flex-col'>
                        <label htmlFor="">Minimum Session Fee</label>
                        <input {...register("minSessionFee")} className='mt-1 border px-3 py-1 rounded focus:outline-none' type="number" />
                    </div>
                </div>
                <ButtonCN type='submit' className='mt-2 bg-teal-600'>Submit</ButtonCN>
            </form>

        </div>
    );
};

export default ChargerFee;