import React from 'react';
import c from './RequestLoader.module.scss'
import Loader from 'UI/Loader/Loader';


const RequestLoader : React.FC = () => {

    return (
        <div className={c.block}>
            <Loader />
        </div>
    )
}

export default RequestLoader;
