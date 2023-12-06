import React from 'react';
import { ArrowRight } from "@phosphor-icons/react";

const Modal = ({ showModal, setShowModal }) => {
    return (
        showModal ?
            <div className='md:w-[450px] m-4 p-6 border bg-[#ffffff] shadow-md fixed z-10 overflow-y-auto top-0 right-0'>
                <p className='flex justify-end'><button onClick={() => setShowModal(!showModal)}>X</button></p>
                <h1 className='text-xl md:text-2xl font-semibold'>Contact Support Center</h1>
                <p className='text-sm font-medium'>To reset your password, please contact with our support center.</p>
                <button className='pt-4 flex items-center font-semibold gap-2'>Call to Center <ArrowRight size={20} /></button>
            </div>
            :
            null
    );
};

export default Modal;