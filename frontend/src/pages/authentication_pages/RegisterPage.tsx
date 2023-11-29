import { FC } from 'react';
import c from './RegisterPage.module.scss'


const RegisterPage: FC  = () => {

    return (
        <div className={c.page}>
            <form className={c.form}>
                <input type='text' placeholder='email' />
                <input type='text' placeholder='password' />
                <button className={c.btn}>Sign Up</button>
            </form>
        </div>
    )
}

export default RegisterPage;
