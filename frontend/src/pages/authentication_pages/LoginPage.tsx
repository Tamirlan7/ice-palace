import { FC, useState, ChangeEvent, FormEvent } from 'react';
import c from './LoginPage.module.scss'
import { loginThunk } from 'slices/authSlice';
import { ILoginRequest } from 'types/authentication_types';
import { useAppDispatch } from 'hooks/reduxHooks';


const LoginPage: FC  = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<ILoginRequest>({
        email: '',
        password: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => 
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    const singIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginThunk(formData))
    }

    return (
        <div className={c.page}>
            <form className={c.form} onSubmit={singIn}>

                <input type="text" placeholder='email' onChange={onChange} value={formData.email} name='email' />
                <input type="password" placeholder='password' onChange={onChange} value={formData.password} name='password' />

                <button type='submit' className={c.btn}>Sign In</button>

            </form>
        </div>
    )
}

export default LoginPage;
