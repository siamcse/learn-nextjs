import { SpinnerGap } from '@phosphor-icons/react';
import React from 'react';

const Loader = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={50} color="black" />
        </div>
    );
};

export default Loader;