import React, { ChangeEvent } from 'react';
import c from './Counter.module.scss';

interface ICounterProps {
    value: number
    setValue: (value: number) => void
    max?: number
    invalid?: boolean
}

const Counter: React.FC<ICounterProps> = ({ value, setValue, max, invalid }) => {
    const decreaseCount = () => {
        if (value === 0) {
            return;
        }
        
        setValue(value - 1);
    };

    const increaseCount = () => {
        if (max && value === max) {
            return;
        }

        setValue(value + 1);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);

        if (!isNaN(value)) {
            setValue(value);
        }
    };

    return (
            <div className={c.block}>
                <button 
                    className={[c.decrease, c.btn, invalid && c.invalid].join(' ')} 
                    onClick={decreaseCount}
                    disabled={value === 0}
                >
                    -
                </button>

                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    className={[c.input, invalid && c.invalid].join(' ')}
                    readOnly
                />

                <button 
                    className={[c.increase, c.btn, invalid && c.invalid].join(' ')} 
                    onClick={increaseCount}
                    disabled={(max && max === value) as boolean}
                >
                    +
                </button>
            </div>
    );
};

export default Counter;