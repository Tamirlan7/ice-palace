import React from 'react'
import c from './Session.module.scss'
import { ReactComponent as Clock } from 'assets/icons/clock.svg'
import { ISession, ISessionNoId } from 'types/types';

interface ISessionProps {
    isHoverEffectEnabled?: boolean;
    session: ISession | ISessionNoId
}

const Session: React.FC<ISessionProps> = ({ isHoverEffectEnabled, session }) => {
    //default value
    
    isHoverEffectEnabled = isHoverEffectEnabled ?? false;

    return (
        <div className={isHoverEffectEnabled ? `${c.block} ${c['block-hover']}` : c.block}>
            <h1 className={c.title}>{session.sessionCount} СЕАНС</h1>
            <div className={c.separator} />
            <figure className={c.icon}>
                <Clock />   
            </figure>

            <div className={c.time}>{session.startTime} - {session.endTime}</div>

            <ul className={c.list}>
                <li className={c.item}>Взрослый билет: {session.adultEntryPrice}{'\u20B8'}</li>
                <li className={c.item}>Детский билет: {session.childEntryPrice}{'\u20B8'}</li>
            </ul>
        </div>
    )
}

export default Session
