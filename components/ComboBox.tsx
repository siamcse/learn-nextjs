import React, { Dispatch, SetStateAction } from 'react';
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CaretDown, Check } from '@phosphor-icons/react'
import { ChargerInformation, ChargerType } from '@/utils/types';
import { FieldErrors } from 'react-hook-form';

type ComboBoxProps = {
    selected: any,
    setSelected: Dispatch<SetStateAction<ChargerType | undefined>>,
    errors: any,
    register: any,
    query: string,
    setQuery: any,
    filteredPeople: any,
    name:string,
}

const ComboBox = ({name, selected, setSelected, errors, register, query, setQuery, filteredPeople }: ComboBoxProps) => {
    const compareById: (a: ChargerType, b: ChargerType) => boolean = (a, b) => {
        return a._id === b._id;
    };

    return (
        <Combobox value={selected} by={compareById} onChange={setSelected}>
            <div className="relative mt-2">
                <p className='mb-2'>Charger Manufucturer</p>
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        {...register(name)}
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                        displayValue={(person: ChargerType) => person.name}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <CaretDown size={20} />
                    </Combobox.Button>
                </div>
                {errors[name] ? <span className='text-red-600'>{errors[name].message}</span> : ''}
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredPeople?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredPeople?.map((person: ChargerType) => (
                                <Combobox.Option
                                    key={person._id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                >
                                                    <Check size={20} />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};

export default ComboBox;