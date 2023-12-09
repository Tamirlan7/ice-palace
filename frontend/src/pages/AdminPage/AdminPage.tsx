import React, { useEffect } from 'react';
import c from './AdminPage.module.scss'
import { useNavigate } from 'react-router-dom';
import { UrlPaths } from 'constants/AppConstants';


const AdminPage : React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(UrlPaths.SESSION_MANAGEMENT)
    }, [navigate])

    return (
        <div className={c.block}>
        
        </div>
    )
}

export default AdminPage;
