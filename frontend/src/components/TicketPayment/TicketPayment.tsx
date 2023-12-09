import React from 'react';
import c from './TicketPayment.module.scss'
import Button from 'UI/Button/Button';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { purchaseTicketThunk } from 'slices/ticketSlice';
import qr from 'assets/images/qr.png'


interface ITicketPaymentProps {
    goBackState: () => void
    goNextState: () => void
}

const TicketPayment : React.FC<ITicketPaymentProps> = ({ goBackState, goNextState }) => {
    const dispatch = useAppDispatch();
    const { 
        selectedSession, 
        adultEntryTicketCount, 
        childEntryTicketCount,
        adultIceSkateCount,
        childIceSkateCount,
        userPhone
    } = useAppSelector(state => state.ticket);

    if (!selectedSession) {
        goBackState()
        return <></>
    }

    const purchaseTicket = () => {
        dispatch(purchaseTicketThunk({
            adultEntryCount: adultEntryTicketCount,
            childEntryCount: childEntryTicketCount,
            adultIceSkateCount: adultIceSkateCount,
            childIceSkateCount: childIceSkateCount,
            iceSessionId: selectedSession.id,
            userPhone,
        }))
    }

    return (
        <div className={c.block}>
            <div className={c['inner-block']}>
                {/* <p className={c.text}>Осталось:00:00:29:23</p>
                <h2>Статус: забронирован</h2> */}
                <p className={c.text}>Подтвердите оплату</p>
                <Button onClick={purchaseTicket}>Оплатить</Button>
                {/* <p className={c.text}>Номер заказа: 17020354590001</p> */}
                <div className={c.qr}>
                    <img className={c.qr} src={qr} alt="qr" />
                </div>
            </div>
        </div>
    )
}

export default TicketPayment;
