import React from 'react';
import cn from '@/utils/cn';

const ButtonCN = ({ children, className, ...restProps }: any) => {
    return (
        <button className={cn(
            'bg-orange-500 text-white  px-4 py-2 rounded',
            className
        )}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default ButtonCN;