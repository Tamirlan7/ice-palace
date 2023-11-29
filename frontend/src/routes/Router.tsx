import { FC } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { adminRoutes, publicRoutes, userRoutes } from "./routes"
import UserRoute from "./UserRoute"
import AdminRoute from "./AdminRoute"
import AppRoute from "./AppRoute"
import { AUTHENTICATED_ADMIN_ENTRY, AUTHENTICATED_USER_ENTRY } from "constants/AppConstants"


const Router: FC = () => {
    
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
