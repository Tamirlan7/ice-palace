import { LOGIN_ROUTE, REGISTER_ROUTE } from 'constants/AppConstants';
import React from 'react';

interface RouteProps {
    key: string;
    path: string;
    component: React.ComponentType;
    meta?: RouteMetaData;
}

export interface RouteMetaData {
    title?: string;
}

export const publicRoutes: RouteProps[] = [
    {
        key: 'public.login',
        path: LOGIN_ROUTE,
        component: React.lazy(() => import('pages/authentication_pages/LoginPage')),
    },
    {
        key: 'public.register',
        path: REGISTER_ROUTE,
        component: React.lazy(() => import('pages/authentication_pages/RegisterPage')),
    },
]

export const userRoutes: RouteProps[] = [
    {
        key: 'user',
        path: '/user',
        component: () => (<div>USER ROUTE</div>),
    },
]

export const adminRoutes: RouteProps[] = [
    {
        key: 'admin',
        path: '/admin',
        component: () => (<div>ADMIN ROUTE</div>),
    },
]

