import React, { useEffect } from 'react';
import c from './SessionManagementPage.module.scss'
import Container from 'components/Container/Container';
import Button from 'UI/Button/Button';
import Modal from 'UI/Modal/Model';
import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { ISessionNoId } from 'types/types';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { getIceSessionsThunk } from 'slices/iceSessionSlice';
import SessionAddForm from 'components/SessionAddForm/SessionAddForm';
import SessionEditForm from 'components/SessionEditForm/SessionEditForm';



const SessionManagementPage : React.FC = () => {
    const dispatch = useAppDispatch()
    const [isAddFormModalActive, setIsAddFormModalActive] = React.useState(false);
    const [isEditFormModalActive, setIsEditFormModalActive] = React.useState(false);
    const { iceSessions, } = useAppSelector(state => state.iceSession)
    const [selectedSession, setSelectedSession] = React.useState<ISessionNoId>({
        id: 0,
        adultEntryPrice: 0,
        childEntryPrice: 0,
        dayCategory: '',
        endTime: '',
        sessionCount: 0,
        startTime: '',
        adultIceSkatePrice: 0,  
        childIceSkatePrice: 0,
    });

    useEffect(() => {
        dispatch(getIceSessionsThunk())
    }, [dispatch])


    const onRow = (record: ISessionNoId, rowIndex?: number) => {
        return {
          onClick: (event: any) => {
            setSelectedSession(record)
            setIsEditFormModalActive(true)
          }, // click row
        };
    }

    const columns: ColumnType<ISessionNoId>[] = [
        {
            title: 'Номер сеанса',
            dataIndex: 'sessionCount' ,
        },
        {
            title: 'Начало сеанса',
            dataIndex: 'startTime',
        },
        {
            title: 'Конец сеанса',
            dataIndex: 'endTime',
        },
        {
            title: 'День недели',
            dataIndex: 'dayCategory',
        },
        {
            title: 'Взрослый билет',
            dataIndex: 'adultEntryPrice',
        },
        {
            title: 'Детский билет',
            dataIndex: 'childEntryPrice',
        },
    ]

    return (
        <div className={c.block}>
            <Container>
                <div className={c['inner-block']}>
                    <h1 className={c.title}>Управления сеансами</h1>            
                    <div className={c['btn-block']}>
                        <Button onClick={() => setIsAddFormModalActive(true)}>Добавить Новый Сеанс</Button>
                        
                        <Modal active={isAddFormModalActive} setActive={setIsAddFormModalActive}>
                            <SessionAddForm setModal={setIsAddFormModalActive} />
                        </Modal>
                    </div>

                    <div className={c.table}>
                        <Table<ISessionNoId>
                            showHeader
                            bordered
                            indentSize={6}
                            columns={columns}
                            dataSource={[
                                ...iceSessions.weekdays.map((session) => ({ ...session, key: session.id })),
                                ...iceSessions.festiveDaysOrWeekends.map((session) => ({ ...session, key: session.id })),
                            ]}
                            onRow={onRow}
                        />
                    </div>

                    <SessionEditForm 
                        isModalActive={isEditFormModalActive} 
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                        setIsModalActive={setIsEditFormModalActive} />
                        
                </div>
            </Container>    
        </div>
    )
}

export default SessionManagementPage;
