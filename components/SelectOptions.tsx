import React, { useEffect } from 'react';
import Select, { DropdownIndicatorProps, components } from 'react-select';
import Loader from './Loader';
import ButtonCN from './ButtonCN';
import { CaretDown, Check, SpinnerGap } from '@phosphor-icons/react';

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
    field: any,
}
type OnChangeData = {
    label: string,
    value: string
}

const SelectOptions = ({ name, field, id, label, data, defaultValue, setValue, setId, getValues, fetching, isSuccess, errors, register, query, setQuery, filteredData }: ComboBoxProps) => {
    const options = filteredData?.map((item: any) => {
        return { label: item.name, value: item._id };
    });

    const customStyles = {
        control: (defaultStyles: any) => ({
            ...defaultStyles,
            padding: "1px",
            border: errors[name] ? "1px solid #FF0000 !important" : "none",
        }),
        dropdownIndicator: (defaultStyles: any) => ({
            ...defaultStyles,
            color: errors[name] ? "red" : "",
        }),
        placeholder: (defaultStyles: any) => ({
            ...defaultStyles,
            color: errors[name] ? "red" : "",
        })
    };
    const handleChange = (data: OnChangeData) => {
        setValue(name, data, { shouldValidate: true });
        setId(data.value);
    }
    // console.log(getValues(name));
    const DropdownIndicator: React.FC<DropdownIndicatorProps> = props => {
        return (
            <components.DropdownIndicator {...props}>
                {
                    fetching ?
                        <SpinnerGap className='inline-block animate-spin rounded-full  motion-reduce:animate-[spin_1.5s_linear_infinite]' size={20} color="black" />
                        :
                        <CaretDown size={20} />
                }
            </components.DropdownIndicator>
        );
    };

    return (
        <div className="w-full">
            <Select
                {...field}
                components={{ DropdownIndicator }}
                styles={customStyles}
                className="basic-single"
                options={options ? options : []}
                defaultValue={options ? options[0] : ''}
                placeholder='Select'
                isSearchable
                // menuIsOpen
                classNamePrefix="react-select"
                onChange={handleChange}
            // value={getValues(name) ?? null}

            />
            {errors[name] ? <p className='text-red-600 text-sm'>{errors[name].message}</p> : ''}
        </div>
    );
};

export default SelectOptions;