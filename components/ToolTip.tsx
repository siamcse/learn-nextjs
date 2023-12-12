import React, { ReactNode } from 'react';

type PropsType = {
    children: ReactNode,
    tooltip?: string,
    title: string
}

const ToolTip = ({ children, tooltip, title }: PropsType) => {
    return (
        <div className='group  relative inline-block mt-2'>
            {children}
            <div className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition p-3 rounded absolute -top-20 -left-32 text-center bg-gray-200 whitespace-nowrap'>
                <span className='text-lg opacity-70 font-semibold'>{title}</span> <br />
                <span className='opacity-70'>{tooltip}</span>
            </div>
        </div>
    );
};

export default ToolTip;