import React, { useEffect } from 'react';
import c from './SessionPick.module.scss'
import { getAllowedSessionsThunk } from 'slices/iceSessionSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import Session from 'components/Session/Session';
import { ISession } from 'types/types';
import { setSelectedSession } from 'slices/ticketSlice';

interface ISessionPick {
    onSessionClick?: () => void
}

const SessionPick : React.FC<ISessionPick> = ({ onSessionClick }) => {
    const dispatch = useAppDispatch();
    const { allowedSessions } = useAppSelector(state => state.iceSession);

    const handleOnSessionClick = (session: ISession) => {
        dispatch(setSelectedSession(session))
        
        if (onSessionClick) {
            onSessionClick()
        }
    }

    useEffect(() => {
        dispatch(getAllowedSessionsThunk())
    }, [dispatch])

    if (allowedSessions.length === 0) {
        return (
            <p className={c.no}>Нет доступных сеансов на сегодня</p>
        )
    }

    return (
        <div className={c.block}>
            <h1 className={c.title}>
                ВЫБЕРИТЕ ОДИН ИЗ <span className={c.yellow}>ДОСТУПНЫХ СЕАНСОВ:</span>
            </h1>

            <ul className={c.list}>
                {allowedSessions.map(session => (
                    <li key={session.id} className={c.item} onClick={() => handleOnSessionClick(session)}>
                        <Session session={session} isHoverEffectEnabled={true} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SessionPick;
