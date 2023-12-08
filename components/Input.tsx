import cn from '@/utils/cn';
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

type PropTypes = {
    className: string,
    register: any

}

const Input = ({ className, register }: PropTypes) => {

    return (
        <input {...register("name")} className={cn(
            'border px-3 py-1 rounded focus:outline-none',
            className
        )}
            type="text" placeholder='Company Name'
        />
    );
};

export default Input;