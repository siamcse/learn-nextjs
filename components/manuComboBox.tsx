import React, { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CaretDown, Check } from '@phosphor-icons/react'
import Loader from './Loader';

type ComboBoxProps = {
    errors: any,
    register: any,
    query: string,
    setQuery: any,
    filteredData: any,
    name: string,
    id: string,
    label: string,
    fetching: boolean,
    defaultValue: any,
    data: any,
    isSuccess: boolean,
    setValue: any,
    getValues: any,
    setId: any,
}

const ManuComboBox = ({ name, id, label, data, defaultValue, setValue, setId, getValues, fetching, isSuccess, errors, register, query, setQuery, filteredData }: ComboBoxProps) => {
    const [selected, setSelected] = useState(defaultValue);
    const [selectedId, setSelectedId] = useState(defaultValue?._id);

    useEffect(() => {
        if (isSuccess && defaultValue) {
            setSelected(defaultValue);
            setSelectedId(defaultValue._id);
        }
    }, [isSuccess, defaultValue])

    useEffect(() => {
        if (selected) {
            setValue(name, selected?.name);
            setValue(id, selectedId);
            setId(selected._id);
        }
    }, [selected, setValue, id, fetching, isSuccess, selectedId])


    const compareById: (a: any, b: any) => boolean = (a, b) => {
        return a?._id === b?._id;
    };

    return (
        <Combobox
            value={selected || ''}
            by={compareById}
            onChange={(e) => {
                setSelected(e)
                setSelectedId(e._id)
            }}
        >
            <div className="relative mt-2">
                <p className='mb-2'>{label}</p>
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        placeholder='Select'
                        {...register(name)}
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                        displayValue={(data: any) => data?.name}
                        onChange={(event) => {
                            console.log("event", event)
                            setQuery(event.target.value)
                        }}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        {
                            fetching ?
                                <Loader size={20} /> : <CaretDown size={20} />
                        }
                    </Combobox.Button>
                </div>
                {errors[name] ? <span className='text-red-600 text-sm'>{errors[name].message}</span> : ''}
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredData?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredData?.map((data: any) => (
                                <Combobox.Option
                                    key={data._id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-3 pr-10 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={data}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                title={data.name}
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {data.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 right-0 flex items-center pr-3 ${active ? 'text-white' : 'text-teal-600'
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

export default ManuComboBox;