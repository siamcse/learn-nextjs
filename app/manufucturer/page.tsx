'use client'
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CaretDown, Check } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]
type ManufacturerType = {
    data: {
        _id: string
        name: string
        clientId: string
        chargerId: string
        address: string
        description: string
        contact: string
        status: string
        created_at: string
        updated_at: string
        __v: number
    }
}
type ChargerType = {
    _id: string
    name: string
    clientId: string
    chargerId: string
    address: string
    description: string
    contact: string
    status: string
    created_at: string
    updated_at: string
    __v: number
}

export default function Example() {
    const token = Cookies.get('token');

    const { data, isFetching } = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            const res: ManufacturerType = await axios.get(`http://192.168.0.186:3004/manufacturer`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data;
        }
    })
    const [selected, setSelected] = useState(!isFetching && data ? data[0] : '');
    const [query, setQuery] = useState('');
    console.log(selected);

    console.log(data);

    const filteredPeople =
        query === ''
            ? data
            : data?.filter((person: { person: { name: string } }) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    if (isFetching) {
        return <Loader />
    }


    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-xl font-semibold'>Primary Information</h1>
            <div className="">
                <Combobox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                                displayValue={(person) => person.name}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <CaretDown size={20} />
                            </Combobox.Button>
                        </div>
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
                                    filteredPeople?.map((person) => (
                                        <Combobox.Option
                                            key={person.id}
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
            </div>
        </div>
    )
}
