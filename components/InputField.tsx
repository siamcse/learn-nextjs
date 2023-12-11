import cn from '@/utils/cn';
import React from 'react';

type PropTypes = {
    className: string,
    register: any,
    name: string,
    label: string,
    type: string,
    errors: any,
    handleZipField?:Function

}

const InputField = ({ className, register, name, label, type, errors, handleZipField }: PropTypes) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                {...register(name)}
                className={cn('mt-1 border px-3 py-1 rounded focus:outline-none', className)}
                type={type}
                placeholder={label}
                onChange={handleZipField}
            />
            {errors[name] ? <span className='text-red-500 text-sm'>{errors[name].message}</span> : ''}
        </>
    );
}
export default InputField;