import React from 'react';
import c from './TicketPurchasePage.module.scss'
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg'
import Container from 'components/Container/Container';
import TextUnderline from 'components/TextUnderline/TextUnderline';
import SessionPick from 'components/SessionPick/SessionPick';
import { useNavigate } from 'react-router-dom';
import { UrlPaths } from 'constants/AppConstants';
import TicketDetails from 'components/TicketDetails/TicketDetails';
import TicketPhone from 'components/TicketPhone/TicketPhone';
import TicketPayment from 'components/TicketPayment/TicketPayment';



const TicketPurchasePage : React.FC = () => {
    const [currentState, setCurrentState] = React.useState<number>(1);
    const navigate = useNavigate();

    const processComponents: {
        [key: number]: React.ReactNode
    } = {
        1: <SessionPick onSessionClick={nextState} />,
        2: <TicketDetails goNextState={nextState} goBackState={prevState} />,
        3: <TicketPhone goNextState={nextState} goBackState={prevState} />,
        4: <TicketPayment goNextState={nextState} goBackState={prevState} />,
    }

    function nextState() {
        if (currentState === Object.keys(processComponents).length) {
            return;
        }

        setCurrentState((prev) => ++prev)
    };

    function prevState() {
        if (currentState === 1) {
            navigate(UrlPaths.HOME);
            return;
        }

        setCurrentState((prev) => --prev);
    }

    return (
        <div className={c.block}>
            <Container>
                <div className={c['back-block']}>
                    <div className={c.back} onClick={prevState}>
                        <figure>
                            <Arrow />
                        </figure>
                        <TextUnderline underlineColor='#000'>
                            <h2 className={[c['back-text']].join(' ')}>ВЕРНУТСЯ НАЗАД</h2>
                        </TextUnderline>
                    </div>
                </div>

                <div className={c.content}>
                    {processComponents[currentState]}
                </div>
            </Container>
        </div>
    )
}

export default TicketPurchasePage;
