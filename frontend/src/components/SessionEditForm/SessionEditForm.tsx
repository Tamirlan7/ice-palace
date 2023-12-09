import React, { Dispatch, SetStateAction } from 'react';
import c from './SessionEditForm.module.scss'
import SessionForm from 'components/SessionForm/SessionForm';
import Session from 'components/Session/Session';
import Modal from 'UI/Modal/Model';
import { Popconfirm } from 'antd';
import { ISessionNoId } from 'types/types';
import { useAppDispatch } from 'hooks/reduxHooks';
import { deleteSessionThunk, updateSessionThunk } from 'slices/iceSessionSlice';
import { useNavigate } from 'react-router-dom';
import { UrlPaths } from 'constants/AppConstants';


interface ISessionEditFormProps {
    isModalActive: boolean
    setIsModalActive: Dispatch<SetStateAction<boolean>>
    selectedSession: ISessionNoId
    setSelectedSession: Dispatch<SetStateAction<ISessionNoId>>
}

const SessionEditForm: React.FC<ISessionEditFormProps> = ({ isModalActive, setIsModalActive, selectedSession, setSelectedSession }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isEditState, setIsEditState] = React.useState(false);
    const [popOverDelete, setPopOverDelete] = React.useState<boolean>(false )

    const navigateToTicketsPage = () => {
        const url = UrlPaths.ICE_SESSION_TICKETS.replace("/:sessionId", `/${selectedSession.id}`)
        navigate(url);
    }

    const deleteSession = () => {
        closeDeletePopOver();
        setIsModalActive(false)

        if (selectedSession.id) {
            dispatch(deleteSessionThunk(selectedSession.id))
        }
    }

    const updateSession = () => {
        closeDeletePopOver();
        setIsModalActive(false)
        setIsEditState(false)
        
        if (selectedSession.id) {
            dispatch(updateSessionThunk(selectedSession))
        }
    }

    const onModalClose = () => {
        closeDeletePopOver()
        setIsEditState(false)
    }

    const openDeletePopOver = () => {
        setPopOverDelete(true)
    }

    const closeDeletePopOver = () => {
        setPopOverDelete(false)
    }

    return (
        <Modal active={isModalActive} onClose={() => onModalClose()} setActive={setIsModalActive}>
            <div className={c.content}>
                {isEditState ? (
                    <div>
                        <SessionForm onBtnClicked={() => updateSession()} data={selectedSession} setData={setSelectedSession} btnText='Изменить' />
                    </div>
                ) : (
                <>
                    <div className={c.session}>
                        <Session session={selectedSession} />
                    </div>
                    <div className={c.btns}>
                        <Popconfirm onConfirm={() => deleteSession()} onCancel={() => closeDeletePopOver()} open={popOverDelete} title="Вы уверены ?" />
                        <button className={[c.btn, c.delete].join(' ')} onClick={() => openDeletePopOver()}>
                            Удалить
                        </button>
                        <button className={[c.btn, c.edit].join(' ')} onClick={() => setIsEditState(true)}>Изменить</button>
                        <button className={[c.btn, c.edit].join(' ')} onClick={() => navigateToTicketsPage()}>Посмотреть список <br /> купленных билетов</button>
                    </div>
                </>
                )}
            </div>
        </Modal>
    )
}

export default SessionEditForm;
