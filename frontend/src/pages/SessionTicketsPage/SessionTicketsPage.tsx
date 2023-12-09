import React, { useEffect } from 'react';
import c from './SessionTicketsPage.module.scss'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { Table } from 'antd';
import { ITicket } from 'types/types';
import { ColumnType } from 'antd/es/table';
import { getIceSessionTicketsThunk } from 'slices/ticketSlice';
import Session from 'components/Session/Session';
import { UrlPaths } from 'constants/AppConstants';
import { getIceSessionByIdThunk } from 'slices/iceSessionSlice';


const SessionTicketsPage : React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { sessionId } = useParams()
    const { selectedIceSession } = useAppSelector(state => state.iceSession);
    const { selectedSessionTickets } = useAppSelector(state => state.ticket);


    useEffect(() => {
        if (sessionId) {
            dispatch(getIceSessionByIdThunk(parseInt(sessionId)))
            dispatch(getIceSessionTicketsThunk(parseInt(sessionId)))
        }
    }, [dispatch, sessionId])

    const columns: ColumnType<ITicket>[] = [
        {
            title: 'Номер телефона пользователя',
            dataIndex: 'userPhone',
        },
        {
            title: 'Количество взрослых билетов',
            dataIndex: 'adultEntryCount',
        },
        {
            title: 'Количество детских билетов',
            dataIndex: 'childEntryCount',
        },
        {
            title: 'Количество взрослых коньков',
            dataIndex: 'adultIceSkateCount',
        },
        {
            title: 'Количество детских коньков',
            dataIndex: 'childIceSkateCount',
        },
    ]

    console.log(selectedIceSession)

    return (
        <div className={c.block}>
            <div className={c.session}>
                <h2>Выбранный сеанс:</h2>
                {selectedIceSession && (
                    <Session session={selectedIceSession} />
                )}
            </div>
            <Table
                columns={columns}
                dataSource={selectedSessionTickets}
            />
        </div>
    )
}

export default SessionTicketsPage;
