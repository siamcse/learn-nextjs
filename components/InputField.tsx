import cn from '@/utils/cn';
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

type PropTypes = {
    className: string,
    register: any,
    name: string,
    label: string,
    type: string,
    defaultValue: string

}

const InputField = ({ className, register, name, label, type, defaultValue }: PropTypes) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                defaultValue={defaultValue ?? ''}
                {...register(name)}
                className={cn('mt-1 border px-3 py-1 rounded focus:outline-none', className)}
                type={type}
                placeholder={label}
            />
        </>
    );
}
export default InputField;