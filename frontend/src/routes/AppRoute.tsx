import { FC } from 'react';
import { RouteMetaData } from './routes';
import Container from 'components/Container/Container';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UrlPaths, stickyButtonAllowedPaths } from 'constants/AppConstants';
import StickyButton from 'components/StickyButton/StickyButton';
import RequestLoader from 'UI/RequestLoader/RequestLoader';
import { useAppSelector } from 'hooks/reduxHooks';


interface AppRouteProps {
    component: React.ComponentType<any>;
    routeKey: string;
    routePath: string;
    blankLayout?: boolean;
    metaData?: RouteMetaData;
}

const AppRoute: FC<AppRouteProps> = ({ component: Component, routeKey, routePath, blankLayout = false, metaData }) => {

    const {  } = useAppSelector(state => state.auth)
    const { loading: generalLoading } = useAppSelector(state => state.general)
    const { loading: sessionLoading } = useAppSelector(state => state.iceSession)
    const { loading: ticketLoading } = useAppSelector(state => state.ticket)

    return (
        <>
            {(generalLoading || sessionLoading || ticketLoading ) && (
                <RequestLoader />
            )}
            <Component {...metaData} />
            
            {stickyButtonAllowedPaths.includes(routePath) && (
                <StickyButton />
            )}
        </>
    )
}

export default AppRoute;
