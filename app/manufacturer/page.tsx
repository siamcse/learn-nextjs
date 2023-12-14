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
import { getChargerModel, getManufucturer } from '@/utils/manufucturer-api'
import EditComboBox from '@/components/EditCombobox';

//Changeable file

const chargerSchema = z.object({
    model: z.string({ required_error: "Model is required", invalid_type_error: "Model must be string" }).min(1, { message: "Model is required" }).min(1, { message: "Model is required" })
        .or(z.object({
            _id: z.string(),
            name: z.string(),
            modelCode: z.string(),
            input: z.string(),
            output: z.string(),
            communicationType: z.string(),
            isMeterVIChangeable: z.string(),
            features: z.string(),
            connectivity: z.string(),
            mount: z.string(),
            manufacturerId: z.string(),
            clientId: z.string(),
            maxPower: z.string(),
            status: z.string(),
            created_at: z.string(),
            updated_at: z.string(),
            __v: z.number(),
            triggerType: z.string(),
            TriggerType: z.string(),
            maxPowerType: z.string(),
        })),
    manufacturer: z.string({ required_error: "Model is required", invalid_type_error: "Manufacturer must be string" }).min(1, { message: "Manufacturer is required" }).min(1, { message: "Manufucturer is required" })
        .or(z.object({
            _id: z.string(),
            name: z.string(),
            clientId: z.string(),
            chargerId: z.string(),
            address: z.string(),
            description: z.string(),
            contact: z.string(),
            status: z.string(),
            created_at: z.string(),
            updated_at: z.string(),
            __v: z.number()
        })),
})


export default function Example() {
    const token = Cookies.get('token');
    const [initialDataFetched, setInitialDataFetched] = useState(false);
    const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm<ChargerInformation>({
        resolver: zodResolver(chargerSchema)
    })

    const [modelQuery, setModelQuery] = useState('');
    const [manuQuery, setManuQuery] = useState('');

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
    const modelQueryData = useQuery({ queryKey: [getValues('manufacturer')], queryFn: () => getChargerModel(getValues('manufacturer')?._id), enabled: !!getValues('manufacturer')?._id });

    useEffect(() => {
        if (manufacturerQuery.isSuccess) {
            setValue('manufacturer', manufacturerQuery.data.data.manufacturer, { shouldValidate: true })
        }
    }, [manufacturerQuery.isSuccess])

    useEffect(() => {
        if (initialDataFetched) {
            // setValue('model', '');
            setValue('model', '');
        }
        if (modelQueryData.isSuccess && !initialDataFetched) {
            setValue('model', modelQueryData.data.data[0], { shouldValidate: true });
            setInitialDataFetched(true);
        }

    }, [modelQueryData.isSuccess, getValues('manufacturer')])

    const filteredManufucture = manuQuery === '' ? data : (data)?.filter((person: any) => person.name.toLowerCase().replace(/\s+/g, '').includes(manuQuery.toLowerCase().replace(/\s+/g, '')))

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
                    <EditComboBox
                        name="manufacturer"
                        label="Charger Manufacturer"
                        query={manuQuery}
                        setQuery={setManuQuery}
                        register={register}
                        errors={errors}
                        filteredData={filteredManufucture}
                        fetching={isFetching}
                        setValue={setValue}
                        getValues={getValues}

                    />
                    <EditComboBox
                        name="model"
                        label="Charger Model Name"
                        query={modelQuery}
                        setQuery={setModelQuery}
                        register={register}
                        errors={errors}
                        filteredData={filteredModel}
                        fetching={modelQueryData.isFetching}
                        setValue={setValue}
                        getValues={getValues}

                    />
                </div>
                <ButtonCN className="bg-teal-600 mt-5">Submit</ButtonCN>
            </form>
        </div>
    )
}
