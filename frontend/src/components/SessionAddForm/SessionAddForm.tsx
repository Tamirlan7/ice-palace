import React, { Dispatch, SetStateAction, useState } from 'react';
import c from './SessionAddForm.module.scss'
import SessionForm from 'components/SessionForm/SessionForm';
import { ISessionNoId } from 'types/types';
import { useAppDispatch } from 'hooks/reduxHooks';
import { addSessionThunk } from 'slices/iceSessionSlice';


interface ISessionAddFormProps {
    setModal: Dispatch<SetStateAction<boolean>>
}

const SessionAddForm : React.FC<ISessionAddFormProps> = ({ setModal }) => {
    const dispatch = useAppDispatch()
    const [addFormData, setAddFormData] = useState<ISessionNoId>({
        adultEntryPrice: 0,
        childEntryPrice: 0,
        dayCategory: 'Будние дни',
        endTime: '',
        startTime: '',
        sessionCount: 1,
        adultIceSkatePrice: 0,
        childIceSkatePrice: 0,
    })

    const addSession = (session: ISessionNoId) => {
        dispatch(addSessionThunk(session))
        setModal(false);

        // bad practice, but i have to do it, 
        // because Table component from antd library 
        // does not refresh the data when it's changed
        // window.location.reload();
    }

    return (
        <SessionForm
            setData={setAddFormData}
            data={addFormData}
            btnText='Добавить' 
            onBtnClicked={(session) => addSession(session)} />
    )
}

export default SessionAddForm;
