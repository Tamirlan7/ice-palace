import {FC, useEffect} from "react"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import { adminRoutes, publicRoutes, userRoutes } from "./routes"
import UserRoute from "./UserRoute"
import AdminRoute from "./AdminRoute"
import AppRoute from "./AppRoute"
import { AUTHENTICATED_ADMIN_ENTRY, AUTHENTICATED_USER_ENTRY } from "constants/AppConstants"
import {getUserThunk, resetRedirect} from "../slices/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import { checkIfPathIsAuthenticated } from "utils/checkIfContains"
import Loader from "UI/Loader/Loader"


const Router: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { role, redirect } = useAppSelector(state => state.user);
    const { pathname } = useLocation();
    
    useEffect(() => {
        dispatch(getUserThunk());
    }, [dispatch])

    useEffect(() => {
        if (checkIfPathIsAuthenticated(pathname)) {
            if (redirect) {
                const route = redirect.toString();
                dispatch(resetRedirect())
                navigate(route, { state: { from: pathname } })
            }
            else {
                dispatch(resetRedirect())
            }
        }
    }, [redirect, navigate, dispatch, pathname])

    if (role == null && checkIfPathIsAuthenticated(pathname)) {
        return <Loader />
    }

    return (
        <Routes>
            {/* User Routes */}
            <Route path='/' element={<UserRoute />}>
                <Route path='/' element={<Navigate to={AUTHENTICATED_USER_ENTRY} replace />} />
                {userRoutes.map((route) => (
                    <Route 
                        path={route.path}
                        key={route.key} 
                        element={
                            <AppRoute 
                                routePath={route.path}
                                component={route.component}
                                routeKey={route.key}
                                metaData={route.meta}
                            />
                        }
                    />
                ))}
                <Route path="*" element={<Navigate to={'/'} replace />} />
            </Route>        

            {/* Admin Routes */}
            <Route path='/' element={<AdminRoute />}>
                <Route path='/' element={<Navigate to={AUTHENTICATED_ADMIN_ENTRY} replace />} />
                {adminRoutes.map((route) => (
                    <Route 
                        path={route.path}
                        key={route.key} 
                        element={
                            <AppRoute 
                                routePath={route.path}
                                component={route.component}
                                routeKey={route.key}
                                metaData={route.meta}
                            />
                        }
                    />
                ))}
                <Route path="*" element={<Navigate to={'/'} replace />} />
            </Route>  

            {/* Public Routes */}
            {publicRoutes.map((route) => (
                <Route 
                    path={route.path}
                    key={route.key} 
                    element={
                        <AppRoute 
                            routePath={route.path}
                            component={route.component}
                            routeKey={route.key}
                            metaData={route.meta}
                        />
                    }
                />
            ))}
        </Routes>

    )
}

export default Router;
