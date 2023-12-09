import React, { ChangeEvent, useState } from 'react';
import c from './SessionForm.module.scss'
import Input from 'UI/Input/Input';
import { ISession, ISessionNoId, dayCategory } from 'types/types';
import NumericInput from 'UI/NumericInput/NumericInput';
import Session from 'components/Session/Session';
import { Select, TimePicker } from 'antd';
import dayjs, { Dayjs }  from 'dayjs';


interface ISessionFormProps {
    onBtnClicked?: (data: ISessionNoId) => void
    btnText: string
    data: ISessionNoId
    setData: React.Dispatch<React.SetStateAction<ISessionNoId>>
}

const SessionForm : React.FC<ISessionFormProps> = ({ btnText, data, onBtnClicked, setData }) => {
    const [isError, setIsError] = useState(false);
    const onTimeChange = (time: Dayjs | null, property: string) => {
        if (isError) {
            setIsError(false)
        }
        if (time) {

            setData((prev) => ({ ...prev, 
                [property]: `${time.get('hours').toString().length === 1 ? "0" : ""}${time.get('hours')}:${time.get('minutes').toString().length === 1 ? "0" : ""}${time.get('minutes')}`}))
        }
        else {
            setData((prev) => ({ ...prev, [property]: '' }))
        }
    }

    function convertToDayJsFromString(time: string) {
        if (time.includes(":")) {
            const splittedTime: string[] = time.split(":")
            const hours = splittedTime[0]
            const minutes = splittedTime[1]
            return dayjs().hour(parseInt(hours)).minute(parseInt(minutes))
        }

        return null
    }

    const onClicked = () => {

        if (!data.sessionCount || 
            data.adultEntryPrice < 100 || 
            data.childEntryPrice < 100 ||
            data.childIceSkatePrice < 100 ||
            data.adultIceSkatePrice < 100 ||
            !data.endTime.length ||
            !data.startTime.length  
        ) {
            setIsError(true)
            return;
        }

        if (onBtnClicked) {
            onBtnClicked(data)
        }
    }

    return (
        <div className={c.block}>
            <div className={c.inner}>
                <form className={c.form}>
                    <div className={c.group}>
                        <p className={c.label}>Номер сеанса</p>
                        <NumericInput invalid={(isError && !data.sessionCount)} className={c.input} value={data.sessionCount} setValue={(value) => setData((prev) => ({...prev, sessionCount: value}))} />
                    </div>
                    {(isError && !data.sessionCount) && (
                        <p className={c.error}>Не валидный номер сеанса</p>
                    )}
                    <div className={c.flex}>
                        <div>
                            <div className={c.group}>
                                <p className={c.label}>Начало сеанса</p>
                                <TimePicker status={(isError && !data.startTime.length) ? 'error' : undefined} value={convertToDayJsFromString(data.startTime)} onChange={(time) => onTimeChange(time, 'startTime')} placeholder='' format={'HH:mm'} className={c.input} size='large' />
                            </div>
                            {(isError && !data.startTime.length) && (
                                <p className={c.error}>Заполните данное поле</p>
                            )}
                        </div>
                        <div>
                            <div className={c.group}>
                                <p className={c.label}>Конец сеанса</p>
                                <TimePicker status={(isError && !data.endTime.length) ? 'error' : undefined} value={convertToDayJsFromString(data.endTime)} onChange={(time) => onTimeChange(time, 'endTime')} placeholder='' format={'HH:mm'} className={c.input} size='large' />
                            </div>
                            {(isError && !data.endTime.length) && (
                                <p className={c.error}>Заполните данное поле</p>
                            )}
                        </div>
                    </div>
                    <div className={c.group}>
                        <p className={c.label}>Цена взрослого билета</p>
                        <NumericInput invalid={(isError && data.adultEntryPrice < 100)} className={c.input} value={data.adultEntryPrice} setValue={(value) => setData((prev) => ({...prev, adultEntryPrice: value}))} />
                    </div>
                    {(isError && data.adultEntryPrice < 100) && (
                        <p className={c.error}>Цена должно быть не менее 100тг</p>
                    )}
                    <div className={c.group}>
                        <p className={c.label}>Цена детского билета</p>
                        <NumericInput invalid={(isError && data.childEntryPrice < 100)} className={c.input} value={data.childEntryPrice} setValue={(value) => setData((prev) => ({...prev, childEntryPrice: value}))} />
                    </div>
                    {(isError && data.childEntryPrice < 100) && (
                        <p className={c.error}>Цена должно быть не менее 100тг</p>
                    )}
                    <div className={c.group}>
                        <p className={c.label}>Цена взрослых коньков</p>
                        <NumericInput invalid={(isError && data.adultIceSkatePrice < 100)} className={c.input} value={data.adultIceSkatePrice} setValue={(value) => setData((prev) => ({...prev, adultIceSkatePrice: value}))} />
                    </div>
                    {(isError && data.adultIceSkatePrice < 100) && (
                        <p className={c.error}>Цена должно быть не менее 100тг</p>
                    )}
                    <div className={c.group}>
                        <p className={c.label}>Цена детских коньков</p>
                        <NumericInput invalid={(isError && data.childIceSkatePrice < 100)} className={c.input} value={data.childIceSkatePrice} setValue={(value) => setData((prev) => ({...prev, childIceSkatePrice: value}))} />
                    </div>
                    {(isError && data.childIceSkatePrice < 100) && (
                        <p className={c.error}>Цена должно быть не менее 100тг</p>
                    )}
                    <div>
                        <p className={c.label}>Категория сеанса</p>
                        <Select
                            size='large'
                            className={c.input} 
                            onChange={(value) => {
                                setData((prev) => ({ ...prev, dayCategory: value }))
                            }}
                            value={data.dayCategory}
                            options={[
                                {
                                    label: 'Будние дни',
                                    value: 'Будние дни',
                                },
                                {
                                    label: 'Выходные или праздничные дни',
                                    value: 'Выходные или праздничные дни'
                                },
                            ]} 
                        />
                    </div>
                </form>
            
                <div className={c.result}>
                    <h3>Результат:</h3>
                    <Session session={data} />
                </div>
            </div>

            <div className={c['btn-block']}>
                    <button type='button' onClick={onClicked} className={c.btn}>{btnText}</button>
                </div>
        </div>
    )
}

export default SessionForm;
