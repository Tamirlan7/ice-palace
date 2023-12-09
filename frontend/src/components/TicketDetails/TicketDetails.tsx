import React, { useState } from 'react';
import c from './TicketDetails.module.scss'
import Session from 'components/Session/Session';
import Counter from 'components/Counter/Counter';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { setAdultEntryTicketCount, setAdultIceSkateCount, setChildEntryTicketCount, setChildIceSkateCount } from 'slices/ticketSlice';

interface ITicketDetailsProps {
    goBackState: () => void
    goNextState: () => void
}

const TicketDetails : React.FC<ITicketDetailsProps> = ({ goBackState, goNextState }) => {
    const dispatch = useAppDispatch();
    const [isError, setIsError] = useState<boolean>(false)
    const { 
        selectedSession, 
        adultEntryTicketCount, 
        childEntryTicketCount,
        adultIceSkateCount,
        childIceSkateCount,
     } = useAppSelector(state => state.ticket) 

    if (selectedSession === null) {
        goBackState();
        return <></>;
    }

    const onAdultTicketValueChange = (count: number) => {
        if (isError) {
            setIsError(false)
        }
        dispatch(setAdultEntryTicketCount(count))
    }

    const onChildTicketValueChange = (count: number) => {
            if (isError) {
                setIsError(false)
            }
            dispatch(setChildEntryTicketCount(count))
    }

    const onAdultIceSkateValueChange = (count: number) => {
            dispatch(setAdultIceSkateCount(count))
    }

    const onChildIceSkateValueChange = (count: number) => {
            dispatch(setChildIceSkateCount(count))
    }

    const onBtnClicked = () => {
        if (
            !adultEntryTicketCount &&
            !childEntryTicketCount
        ) {
            setIsError(true)
            return;
        }

        goNextState();
    }

    return (
        <div className={c.block}>
            <div className={c.content}>
                <div className={c.main}>
                    <h1 className={c.title}>Услуги входа:</h1>
                    <span className={c.note}>Детский билет (до 14 лет включительно) отпускается <br />при предъявления документа, подтверждающий возраст</span>
                    <p className={c.service}>- Детский билет: {selectedSession.childEntryPrice}{'\u20B8'}</p>
                    <Counter invalid={(isError && !adultEntryTicketCount && !childEntryTicketCount)} value={childEntryTicketCount} setValue={onChildTicketValueChange} />
                    {(isError && !adultEntryTicketCount && !childEntryTicketCount) && (
                        <p className={c.error}>Должен быть куплен как минимум один из билетов (Взрослый либо Детский)</p>
                    )}

                    <p className={c.service}>- Взрослый билет: {selectedSession.adultEntryPrice}{'\u20B8'}</p>
                    <Counter invalid={(isError && !adultEntryTicketCount && !childEntryTicketCount)} value={adultEntryTicketCount} setValue={onAdultTicketValueChange} />
                    {(isError && !adultEntryTicketCount && !childEntryTicketCount) && (
                        <p className={c.error}>Должен быть куплен как минимум один из билетов (Взрослый либо Детский)</p>
                    )}
                    <h1 className={[c.title, c.title2].join(' ')}>Дополнительный услуги:</h1>
                    <span className={c.note}>Прокат коньков выдается под залог удостоверения <br /> личности или свидетельство о рождении</span>
                    <p className={c.service}>Прокат коньков - Взрослый : {selectedSession.adultEntryPrice}{'\u20B8'}</p>
                    <Counter max={10} value={adultIceSkateCount} setValue={onAdultIceSkateValueChange}  />
                    <p className={c.service}>Прокат коньков - Детский (до 14 лет включительно): {selectedSession.childEntryPrice}{'\u20B8'}</p>
                    <span className={c.note}>До 37 размера (включительно)</span>
                    <Counter max={10} value={childIceSkateCount} setValue={onChildIceSkateValueChange} />
                </div>
                <div className={c.aside}>
                    <h1 className={c.title}>Выбранный сеанс:</h1>
                    <div className={c.session}>
                        <Session session={selectedSession} />
                    </div>
                </div>
            </div>
            <div className={c.btns}>
                <button className={c.btn} onClick={onBtnClicked}>Продолжить</button>
            </div>
        </div>
        
    )
}

export default TicketDetails;
