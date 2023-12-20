import React, { ReactNode } from 'react';
import cn from '@/utils/cn';

type ButtonPropTypes = {
    children:ReactNode,
    className:string,
    restProps:any
}

const ButtonCN = ({ children, className, ...restProps }: any) => {
    return (
        <button className={cn(
            'bg-teal-700 text-white  px-4 py-2 rounded',
            className
        )}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default ButtonCN;