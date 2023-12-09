import React from 'react';
import c from './Button.module.scss'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button : React.FC<IButtonProps> = ({ children, className, ...props }) => {

    return (
        <button
            className={`${c.btn} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;
