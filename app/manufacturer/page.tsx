'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ButtonCN from '@/components/ButtonCN'
import { ChargerInformation, ChargerType } from '@/utils/types'
import { getChargerModel, getManufucturer } from '@/utils/manufucturer-api'
import ManuComboBox from '@/components/manuComboBox';
import SelectOptions from '@/components/SelectOptions';


const chargerSchema = z.object({
    manufacturer: z.string().min(1, { message: "Manufucturer is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    // manufacturerId: z.string(),
    // modelId: z.string()
})


export default function Example() {
    const token = Cookies.get('token');
    const [manufacturerId, setManufacturerId] = useState('');
    const [modelId, setModelId] = useState('');

    const [modelQuery, setModelQuery] = useState('');
    const [manuQuery, setManuQuery] = useState('');
    const [initialDataFetched, setInitialDataFetched] = useState(false);

    const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm<ChargerInformation>({
        resolver: zodResolver(chargerSchema)
    })

    const { data, isSuccess, isFetching } = useQuery({
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
    const modelQueryData = useQuery({ queryKey: [manufacturerId], queryFn: () => getChargerModel(manufacturerId), enabled: !!manufacturerId });

    useEffect(() => {
        if (initialDataFetched) {
            setValue('model', '');
        }
        if (modelQueryData.isSuccess && !initialDataFetched) {
            setInitialDataFetched(true);
        }
    }, [modelQueryData.isSuccess, manufacturerId])

    useEffect(() => {
        const fieldIds = {
            "manufacturerId": manufacturerId,
            "modelId": modelId
        }
        Object.entries(fieldIds).forEach(([fieldName, value]: any) => {
            setValue(fieldName, value);
        })
    }, [manufacturerId, modelId])



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
                <div className='flex gap-10 mt-5'>
                    <SelectOptions
                        name="manufacturer"
                        id="manufacturerId"
                        label="Charger Manufacturer"
                        defaultValue={manufacturerQuery?.data?.data?.manufacturer}
                        data={data}
                        query={manuQuery}
                        setQuery={setManuQuery}
                        register={register}
                        errors={errors}
                        filteredData={filteredManufucture}
                        fetching={isFetching}
                        isSuccess={isSuccess}
                        setValue={setValue}
                        getValues={getValues}
                        setId={setManufacturerId}
                    />
                    <SelectOptions
                        name="model"
                        id="modelId"
                        label="Charger Model Name"
                        defaultValue={!initialDataFetched ? modelQueryData?.data?.data[0] : ''}
                        data={modelQueryData?.data?.data}
                        query={modelQuery}
                        setQuery={setModelQuery}
                        register={register}
                        errors={errors}
                        filteredData={filteredModel}
                        fetching={modelQueryData.isFetching}
                        isSuccess={modelQueryData.isSuccess}
                        setValue={setValue}
                        getValues={getValues}
                        setId={setModelId}

                    />
                </div>
                <ButtonCN className="bg-teal-600 mt-5">Submit</ButtonCN>
            </form>
        </div>
    )
}