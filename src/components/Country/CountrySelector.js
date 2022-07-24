import React from 'react'
import { Select } from 'antd';
import { useNavigate } from 'react-router';
const { Option } = Select;
const CountrySelector = ({ country }) => {
    const navigate = useNavigate()
    const onChange = (value) => {
        navigate(`/country-detail/${value}`)
    };
    const onSearch = (value) => {
        // console.log(value);
    };

    return (
        <div>
            <Select
                size='large'
                autoFocus
                style={{ width: '20rem' }}
                showSearch
                placeholder="Select a Country"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
                {country !== null && country?.map(item => (
                    <Option label={item.countryInfo.iso2} value={item.country} key={item.countryInfo.lat}>{item.country}</Option>
                ))}
            </Select>
        </div>
    )
}

export default CountrySelector