import React, { ChangeEvent } from 'react';
import Input from 'UI/Input/Input';


interface INumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: number
    setValue: (value: number) => void   
    invalid?: boolean  
}

const NumericInput : React.FC<INumericInputProps> = ({ value, setValue, invalid, ...props }) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            let value: number = parseInt(e.target.value)
            setValue(value)
        }
        else {
            setValue(0);
        }
    }

    return (
        <Input 
            {...props} 
            invalid={invalid}
            onChange={onChange} 
            value={value} 
            type='text' 
        />
    )
}

export default NumericInput;
