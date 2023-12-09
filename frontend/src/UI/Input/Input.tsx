import React, { FormEvent } from 'react';
import c from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mode?: 'default' | 'phone'
    onPhoneChange?: (phone: number) => void
    invalid?: boolean
}


const Input : React.FC<InputProps> = ({ mode, onPhoneChange, className, invalid, ...props }) => {
    //default value
    mode = mode ?? 'default';

    const [value, setValue] = React.useState<number>(8);
    const phoneNumberLength = 11;
    const onBackscapePressed = React.useRef<boolean>(false);
    const selectedPhone = React.useRef<number>();

    function deserializePhone(phone: string): number {
        if (phone) {
            let numbers = phone.match(/\b\d+\b/g)?.join('');

            if (numbers) {
                numbers = numbers.substring(0, phoneNumberLength);
                let newNumbers = numbers.split('');
                newNumbers[0] = '8'
                return parseInt(newNumbers.join(''));
            }
        }
        
        return -1;
    }

    function serializePhone(): string {
        if (value) {
            const arr: string[] = value.toString().split('');
            const newArr: string[] = [];

            for (let idx = 0; idx <= phoneNumberLength - 1; idx++) {
                let el: string = arr[idx] ?? '-';

                if (el === '8' && idx === 0) {
                    el = '+7'
                }

                if (idx === 1) {
                    newArr.push(' ');
                    newArr.push('(')
                }

                newArr.push(el)

                if (idx === 3) {
                    newArr.push(')')
                    newArr.push(' ');
                }

                if (idx === 6) {
                    newArr.push(' ');
                }
            }
            return newArr.join('');
        }

        return '';
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (value === 8 && onBackscapePressed.current) {
            return;
        }

        const deserializedPhone: number = deserializePhone(e.target.value)

        if (deserializedPhone !== -1) {
            if (onPhoneChange) {
                onPhoneChange(deserializedPhone);
            }
            setValue(deserializedPhone);
        } 
    }

    const handleSelection = (event: React.FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement; 
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;
    
        if (selectionStart !== null && selectionEnd !== null) {
            const selectedText = input.value.substring(selectionStart, selectionEnd);
            const deserializedPhone = deserializePhone(selectedText);
            selectedPhone.current = deserializedPhone;
        }
      };

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace') {

            onBackscapePressed.current = true;

            if (value === 8) {
                return;
            }

            if (selectedPhone.current?.toString().length) {
                let deletedValue = value.toString().replace(selectedPhone.current?.toString(), '');
                if (deletedValue === '') {
                    deletedValue = '8';
                }

                setValue(parseInt(deletedValue));
                selectedPhone.current = undefined;
                return;
            }

            setValue((prev) => parseInt(prev.toString().slice(0, -1)))
        }

        onBackscapePressed.current = false;
    }

    if (mode === 'phone') {
        return (
            <input 
                className={`${c.input} ${className} ${c.phone} ${invalid && c.invalid}`}
                {...props}
                value={serializePhone()}
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
                onSelect={handleSelection}
                type='text' 
            />
        )
    }

    return (
        <input 
            className={`${c.input} ${className} ${invalid && c.invalid}`}
            {...props} 
        />
    )
}

export default Input;
