import { SpinnerGap } from '@phosphor-icons/react';
import React from 'react';

type PropsType = {
    size:number;
}

const Loader:any = ({size}:PropsType) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={size} color="black" />
        </div>
    );
};

export default Loader;