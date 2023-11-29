import { FC } from 'react';
import { RouteMetaData } from './routes';


interface AppRouteProps {
    component: React.ComponentType<any>;
    routeKey: string;
    blankLayout?: boolean;
    metaData?: RouteMetaData;
}

const AppRoute: FC<AppRouteProps> = ({ component: Component, routeKey, blankLayout = false, metaData }) => {

    return (
        <Component {...metaData} />
    )
}

export default AppRoute;
