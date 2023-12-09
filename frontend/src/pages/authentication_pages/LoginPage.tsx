import { FC, useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import c from './LoginPage.module.scss'
import { loginThunk } from 'slices/authSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserThunk } from 'slices/userSlice';
import { UrlPaths } from 'constants/AppConstants';
import Loader from 'UI/Loader/Loader';
import RequestLoader from 'UI/RequestLoader/RequestLoader';


const LoginPage: FC  = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { role, loading: userLoading } = useAppSelector(state => state.user)
    const { loading: authLoading } = useAppSelector(state => state.auth)
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<number>();

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onPhoneChange = (phone: number) => {
        setPhone(phone);
    }

    const singIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (phone && password) {
            dispatch(loginThunk({
                phone,
                password,
            }))
        }
    }

    useEffect(() => {
        dispatch(getUserThunk())

        if (role !== null) {
            if (location.state.from) {
                navigate(location.state.from);
                return;
            }

            navigate(UrlPaths.HOME);
        }
    }, [role, navigate, location, dispatch])


    return (
        <>
            {(authLoading || userLoading) && (<RequestLoader />)}
            <div className={c.block}>
                <form className={c.form} onSubmit={singIn}>
                    <h1>Войти</h1>
                    <Input mode='phone' onPhoneChange={onPhoneChange} className={c.input} type="text" placeholder='Номер' name='phone' />
                    <Input className={c.input} type="password" placeholder='Пароль' onChange={onPasswordChange} value={password} name='password' />

                    <Button type='submit' className={c.btn}>Войти</Button>

                </form>
            </div>
        </>
    )
}

export default LoginPage;
