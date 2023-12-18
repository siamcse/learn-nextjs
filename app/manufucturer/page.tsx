'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ButtonCN from '@/components/ButtonCN'
import { ChargerInformation, ChargerType, ModelType } from '@/utils/types'
import ComboBox from '@/components/ComboBox'
import { getChargerModel, getManufucturer } from '@/utils/manufucturer-api'


const chargerSchema = z.object({
    manufacturer: z.string().min(1, { message: "Manufucturer is required" }),
    model: z.string().min(1, { message: "Model is required" }),
})


export default function Example() {
    const token = Cookies.get('token');
    const [manufacturer, setManufacturer] = useState<ChargerType>();
    const [model, setModel] = useState<ModelType | null | undefined>();
    const [modelQuery, setModelQuery] = useState('');
    const [manuQuery, setManuQuery] = useState('');
    const [initialDataFetched, setInitialDataFetched] = useState(false);

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

    const manufacturerQuery = useQuery({ queryKey: ['manufacturer'], queryFn: getManufucturer })
    const modelQueryData = useQuery({ queryKey: [manufacturer], queryFn: () => getChargerModel(manufacturer?._id), enabled: !!manufacturer?._id });

    useEffect(() => {
        if (manufacturerQuery.isSuccess) {
            setManufacturer(manufacturerQuery.data.data.manufacturer)
        }
    }, [manufacturerQuery.isSuccess])

    useEffect(() => {
        if (initialDataFetched) {
            setModel(undefined);
            setValue('model', '');
        }
        if (modelQueryData.isSuccess && !initialDataFetched) {
            setModel(modelQueryData.data.data[0]);
            setInitialDataFetched(true);
        }

    }, [modelQueryData.isSuccess, manufacturer])

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<ChargerInformation>({
        resolver: zodResolver(chargerSchema)
    })
    useEffect(() => {
        if (manufacturer) {
            setValue('manufacturer', manufacturer?.name);
        }
        if (model) {
            setValue('model', model?.name)
        }
    }, [manufacturer, model])

    const filteredManufucture = manuQuery === '' ? data : (data)?.filter((data: any) => data.name.toLowerCase().replace(/\s+/g, '').includes(manuQuery.toLowerCase().replace(/\s+/g, '')))

    let filteredModel;

    if (modelQueryData.isSuccess) {
        filteredModel = modelQuery === '' ? modelQueryData?.data.data : modelQueryData?.data.data.filter((data: any) => data.name.toLowerCase().replace(/\s+/g, '').includes(modelQuery.toLowerCase().replace(/\s+/g, '')))
    }
    const handleForm = (data: ChargerInformation) => {
        console.log(data);
    }

    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-xl font-semibold'>Primary Information</h1>
            <form onSubmit={handleSubmit(handleForm)} className="">
                <div className='flex gap-10'>
                    <ComboBox
                        name="manufacturer"
                        label="Charger Manufacturer"
                        selected={manufacturer}
                        setSelected={setManufacturer}
                        query={manuQuery}
                        setQuery={setManuQuery}
                        register={register}
                        errors={errors}
                        filteredData={filteredManufucture}
                        fetching={isFetching}

                    />
                    <ComboBox
                        name="model"
                        label="Charger Model Name"
                        selected={model}
                        setSelected={setModel}
                        query={modelQuery}
                        setQuery={setModelQuery}
                        register={register}
                        errors={errors}
                        filteredData={filteredModel}
                        fetching={modelQueryData.isFetching}

                    />
                </div>
                <ButtonCN className="bg-teal-600 mt-5">Submit</ButtonCN>
            </form>
        </div>
    )
}
