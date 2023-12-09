import React from 'react';
import c from './TicketPhone.module.scss'
import Input from 'UI/Input/Input';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Button from 'UI/Button/Button';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { setPhoneReducer } from 'slices/ticketSlice';


interface ITicketPhoneProps {
    goBackState: () => void
    goNextState: () => void
}

const TicketPhone : React.FC<ITicketPhoneProps> = ({ goBackState, goNextState }) => {
    const dispatch = useAppDispatch();
    const [phone, setPhone] = React.useState<number>(8);
    const [confirmPhone, setConfirmPhone] = React.useState<number>(8);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [checkboxes, setCheckboxes] = React.useState({
        payment: false,
        sms: false,
        rules: false
    });
    const { 
        selectedSession, 
        adultEntryTicketCount, 
        childEntryTicketCount,
        adultIceSkateCount,
        childIceSkateCount,
    } = useAppSelector(state => state.ticket) 

    if (!selectedSession) {
        goBackState();
        return <></>
    }

    const adultTicketTotalPrice = selectedSession.adultEntryPrice * adultEntryTicketCount
    const childTicketTotalPrice = selectedSession.childEntryPrice * childEntryTicketCount
    const adultIceSkateTotalPrice = selectedSession.adultIceSkatePrice * adultIceSkateCount
    const childIceSkateTotalPrice = selectedSession.childIceSkatePrice * childIceSkateCount
    const totalPrice = adultTicketTotalPrice + childTicketTotalPrice + adultIceSkateTotalPrice + childIceSkateTotalPrice

    const onCheckboxChange = (e: CheckboxChangeEvent) => {
        setCheckboxes((prev) => ({...prev, [e.target.name as string]: e.target.checked}))
        if (isError) {
            setIsError(false)
        }
    }

    const onPhoneChange = (value: number) => {
        setPhone(value)
        if (isError) {
            setIsError(false)
        }
        dispatch(setPhoneReducer(value.toString()))
    }

    const onConfirmPhoneChange = (value: number) => {
        setConfirmPhone(value)
        if (isError) {
            setIsError(false)
        }
    }

    const onBtnClicked = () => {
        const {
            payment,
            rules,
            sms
        } = checkboxes

        if (!phone || phone.toString().length < 11 || phone !== confirmPhone) {
            setIsError(true)
            return;
        }


        if (!payment || !rules || !sms) {
            setIsError(true)
            return;
        }

        goNextState()
        // dispatch(createOrderThunk({
        //     userPhone: phone.toString(),
        //     adultEntryCount: adultEntryTicketCount,
        //     adultIceSkateCount: adultIceSkateCount,
        //     childEntryCount: childEntryTicketCount,
        //     childIceSkateCount: childIceSkateCount,
        //     totalPrice: totalPrice,
        // }))
    }

    return (
        <div className={c.block}>
            <div className={c['inner-block']}>
                <form className={c.form}>
                    <h2 className={c.title}>Подтвердите действие</h2>
                    <p className={c.label}>Введите свой номер телефона</p>   
                    <Input invalid={(isError && phone && phone.toString().length < 10) as boolean} className={c.input} mode='phone' value={phone} onPhoneChange={onPhoneChange}  />
                    {(isError && phone && phone.toString().length < 10) && (
                        <p className={c.error}>Номер телефона не полностью заполнен</p>
                    )}
                    <p className={c.label}>Подтвердите свой номер телефона</p>   
                    <Input invalid={(isError && phone !== confirmPhone) || (isError && confirmPhone && confirmPhone.toString().length < 10) as boolean} className={c.input} mode='phone' value={confirmPhone} onPhoneChange={onConfirmPhoneChange}  />
                    {(isError && phone !== confirmPhone) && (
                        <p className={c.error}>Номера телефона не совпадают</p>
                    )}
                    {(isError && confirmPhone && confirmPhone.toString().length < 10) && (
                        <p className={c.error}>Номер телефона не полностью заполнен</p>
                    )}
                    <div className={c['checkbox-block']}>
                        <Checkbox checked={checkboxes.rules} name='rules' onChange={onCheckboxChange} className={c.checkbox} />
                        <span className={c['checkbox-text']}>Ознакомлен и согласен <Link className={c.link} to={'/'}>с правилами посещения <br /> массовых катаний</Link></span>
                    </div>
                    {(isError && !checkboxes.payment) && (
                        <p className={c.error}>Для продолжения необходимо согласится с правилами посещения массовых катаний</p>
                    )}
                    <div className={c['checkbox-block']}>
                        <Checkbox checked={checkboxes.payment} name='payment' onChange={onCheckboxChange} className={c.checkbox} />
                        <span className={c['checkbox-text']}>Ознакомлен и согласен с <Link className={c.link} to={'/'}>договором оферты</Link></span>
                    </div>
                    {(isError && !checkboxes.payment) && (
                        <p className={c.error}>Для продолжения необходимо согласится с договором оферты</p>
                    )}
                    <div className={c['checkbox-block']}>
                        <Checkbox checked={checkboxes.sms} name='sms' onChange={onCheckboxChange} className={c.checkbox} />
                        <span className={c['checkbox-text']}>Я соглашаюсь на сбор и обработку данных для <br /> отправки SMS</span>
                    </div>
                    {(isError && !checkboxes.sms) && (
                        <p className={c.error}>Для продолжения необходимо согласится со сбором данных для отправки SMS</p>
                    )}

                    <div className={c.btns}>
                        <Button type='button' className={c.btn} onClick={onBtnClicked}>Далее</Button>
                    </div>
                </form>

                <div className={c.info}>
                    <div className={c.prices}>
                        <h2>Информация об услугах</h2>
                        {adultEntryTicketCount !== 0 && (
                            <p className={c.text}>Взрослый Билет ({adultEntryTicketCount}): <span className={c.price}>{adultTicketTotalPrice}{'\u20B8'}</span></p>
                        )}
                        {childEntryTicketCount !== 0 && (
                            <p className={c.text}>Детский Билет ({childEntryTicketCount}): <span className={c.price}>{childTicketTotalPrice}{'\u20B8'}</span></p>
                        )}
                        {adultIceSkateCount !== 0 && (
                            <p className={c.text}>Взрослый Билет ({adultIceSkateCount}): <span className={c.price}>{adultIceSkateTotalPrice}{'\u20B8'}</span></p>
                        )}
                        {childIceSkateCount !== 0 && (
                            <p className={c.text}>Детский Билет ({childIceSkateCount}): <span className={c.price}>{childIceSkateTotalPrice}{'\u20B8'}</span></p>
                        )}
                    </div>
                    {(adultEntryTicketCount !== 0 || childEntryTicketCount !== 0 || adultIceSkateCount !== 0 || childIceSkateCount !== 0) && (
                        <p className={[c.text, c.total].join(' ')}>
                            Общая сумма: {totalPrice}{'\u20B8'}
                        </p>
                    )}
                </div>
            </div>
                
        </div>
    )
}

export default TicketPhone;
