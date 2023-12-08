import React from 'react';
import ButtonCN from './ButtonCN';
import { SpinnerGap } from '@phosphor-icons/react';
import InputField from './InputField';

type PropTypes = {
    title: string,
    handleSubmit: any,
    handleFormSubmit: any,
    isPending: boolean,
    register: any

}

const Form = ({ title, handleSubmit, handleFormSubmit, isPending, register }: PropTypes) => {
    return (
        <form className='px-5' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex justify-between my-10'>
                <h1 className='text-3xl font-bold text-center'>{title}</h1>
                <div>
                    <ButtonCN disabled={isPending} type="submit" className={`bg-teal-700 hover:bg-teal-800 ${isPending ? 'opacity-60' : ''}`}>
                        Submit{" "}
                        {
                            isPending ? <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={20} color="white" /> : null
                        }
                    </ButtonCN>
                </div>
            </div>
            <div>
                <h3 className='text-xl font-semibold'>Primary Information</h3>
                <div className='mt-4'>
                    <div className='mt-4 flex flex-col'>
                        <InputField
                            className=''
                            label='Company Name'
                            name='name'
                            register={register}
                            type='text'
                        />
                    </div>
                    <div className='mt-4 md:flex gap-6'>
                        <div className='flex flex-col'>
                            <InputField
                                className='md:w-[430px]'
                                label='Email Address'
                                name='email'
                                register={register}
                                type='email'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <InputField
                                className='md:w-[314px]'
                                label='Phone Number'
                                name='phone'
                                register={register}
                                type='text'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <h3 className='text-xl font-semibold'>Address Information</h3>
                <div className='mt-4'>
                    <div className='md:flex gap-5'>
                        <div className='mt-4 flex flex-col'>
                            <InputField
                                className=''
                                label='Country'
                                name='country'
                                register={register}
                                type='text'
                            />
                        </div>
                        <div className='mt-4 flex flex-col'>
                            <InputField
                                className=''
                                label='Zip / Postal Code'
                                name='zip'
                                register={register}
                                type='text'
                            />
                        </div>
                        <div className='mt-4 flex flex-col'>
                            <InputField
                                className=''
                                label='City'
                                name='city'
                                register={register}
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='mt-4 md:flex gap-6'>
                        <div className='flex flex-col'>
                            <InputField
                                className='md:w-[430px]'
                                label='Street Address'
                                name='address'
                                register={register}
                                type='text'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <InputField
                                className='md:w-[314px]'
                                label='State / Province'
                                name='state'
                                register={register}
                                type='text'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;