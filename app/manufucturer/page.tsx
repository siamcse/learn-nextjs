'use client'
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CaretDown, Check } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ButtonCN from '@/components/ButtonCN'
import { ChargerInformation, ChargerType } from '@/utils/types'
import ComboBox from '@/components/ComboBox'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

const chargerSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    model: z.string().min(1, { message: "Model is required" }),
})


export default function Example() {
    const token = Cookies.get('token');
    const [manufacturer, setManufacturer] = useState<ChargerType>();
    const [manuQuery, setManuQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const { data, isFetching } = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/manufacturer`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data as ChargerType[];
        }
    })

    const manufucturerQuery = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            const res = await axios.get(`http://192.168.0.186:3004/charger/65685b405968894bc209a0f3`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res.data);
            return res.data as ChargerType;
        }
    })


    const { register, setValue, handleSubmit, formState: { errors } } = useForm<ChargerInformation>({
        resolver: zodResolver(chargerSchema)
    })
    useEffect(() => {
        // setmanufacturer(manufucturerQuery.data);
        if (manufacturer) {
            setValue('name', manufacturer?.name);
        }
    }, [manufucturerQuery.data, manufacturer])

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.0.186:3004/charger/65685b405968894bc209a0f3`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setManufacturer(res.data.manufacturer);
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }, [token])


    const filteredPeople = manuQuery === '' ? data : (data)?.filter((person: any) => person.name.toLowerCase().replace(/\s+/g, '').includes(manuQuery.toLowerCase().replace(/\s+/g, '')))
    if (isFetching || loading) {
        return <Loader />
    }

    const compareById: (a: ChargerType, b: ChargerType) => boolean = (a, b) => {
        return a._id === b._id;
    };

    const handleForm = (data: ChargerInformation) => {
        console.log(data);
    }

    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-xl font-semibold'>Primary Information</h1>
            <form onSubmit={handleSubmit(handleForm)} className="">
                <div className='flex gap-10'>
                    <Combobox value={manufacturer} by={compareById} onChange={setManufacturer}>
                        <div className="relative mt-2">
                            <p className='mb-2'>Charger Manufucturer</p>
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <Combobox.Input
                                    {...register("model")}
                                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                                    displayValue={(person: ChargerType) => person.name}
                                    onChange={(event) => setManuQuery(event.target.value)}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <CaretDown size={20} />
                                </Combobox.Button>
                            </div>
                            {errors.name ? <span className='text-red-600'>{errors.name.message}</span> : ''}
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setManuQuery('')}
                            >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {filteredPeople?.length === 0 && manuQuery !== '' ? (
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
                    <ComboBox
                        name="model"
                        selected={manufacturer}
                        setSelected={setManufacturer}
                        query={manuQuery}
                        setQuery={setManuQuery}
                        register={register}
                        errors={errors}
                        filteredPeople={filteredPeople}

                    />
                </div>
                <ButtonCN className="bg-teal-600 mt-5">Submit</ButtonCN>
            </form>
        </div>
    )
}
