import React, { useEffect } from "react";
import c from './LandingSessions.module.scss'
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg'
import Session from "components/Session/Session";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getIceSessionsThunk, sortSessions } from "slices/iceSessionSlice";


const LandingSessions: React.FC = () => {
    const { iceSessions } = useAppSelector(state => state.iceSession)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getIceSessionsThunk())
    }, [dispatch])

    return (
        <div className={c.block}>
            <h1 className={c.title}>Расписание сеансов</h1>
            <h1 className={c.type}>БУДНИЕ ДНИ</h1>
            <figure className={c.arrow}>
                <Arrow />
            </figure>
            <ul className={c.sessions}>
                {iceSessions.weekdays.map((session) => (
                    <li key={session.id}>
                        <Session session={session} />
                    </li>
                ))}
                {!iceSessions.weekdays.length && (
                    <p className={c.no}>Нет доступых сеансов</p>
                )}
            </ul>

            <h1 className={`${c.type} ${c['second-type']}`}>ВЫХОДНЫЕ И ПРАЗДНИЧНЫЕ ДНИ</h1>
            <figure className={c.arrow}>
                <Arrow />
            </figure>
            <ul className={c.sessions}>
                {iceSessions.festiveDaysOrWeekends.map((session) => (
                    <li key={session.id}>
                        <Session session={session} />
                    </li>
                ))}
                {!iceSessions.festiveDaysOrWeekends.length && (
                    <p className={c.no}>Нет доступых сеансов</p>
                )}
            </ul>
        </div>
    )
}

export default LandingSessions;
