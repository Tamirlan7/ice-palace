import React from 'react';
import c from './StickyButton.module.scss'
import Container from 'components/Container/Container';
import Button from 'UI/Button/Button';
import { UrlPaths } from 'constants/AppConstants';
import { useNavigate } from 'react-router-dom';


const StickyButton : React.FC = () => {
    const navigate = useNavigate();

    const navigateToTicketPurchasePage = () => {
        navigate(UrlPaths.TICKET)
    }

    return (
        <div className={c['btn-block']}>
            <Container>
                <div className={c['btn-block-inner']}>
                    <Button className={c.btn} onClick={() => navigateToTicketPurchasePage()}>КУПИТЬ БИЛЕТ</Button>
                </div>
            </Container>
        </div>
    )
}

export default StickyButton;
