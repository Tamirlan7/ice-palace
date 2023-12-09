import { LOGIN_ROUTE, REGISTER_ROUTE, UrlPaths } from 'constants/AppConstants';
import AdminPage from 'pages/AdminPage/AdminPage';
import HomePage from 'pages/HomePage/HomePage';
import SessionManagementPage from 'pages/SessionManagementPage/SessionManagementPage';
import SessionTicketsPage from 'pages/SessionTicketsPage/SessionTicketsPage';
import SessionsDatePage from 'pages/SessionsDatePage/SessionsDatePage';
import TicketPurchasePage from 'pages/TicketPurchasePage/TicketPurchasePage';
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
    {
        key: 'public.home',
        path: UrlPaths.HOME,
        component: () => (<HomePage />),
    },
    {
        key: 'public.sessions.datetime',
        path: UrlPaths.SESSIONS_DATE,
        component: () => (<HomePage />),
    },
    {
        key: 'public.sessions.datetime',
        path: UrlPaths.SESSIONS_DATE,
        component: () => (<SessionsDatePage />),
    },
    {
        key: 'public.sessions.datetime',
        path: UrlPaths.TICKET,
        component: () => (<TicketPurchasePage />),
    },
]

export const userRoutes: RouteProps[] = [

]

export const adminRoutes: RouteProps[] = [
    {
        key: 'admin',
        path: UrlPaths.ADMIN,
        component: () => (<AdminPage />),
    },
    {
        key: 'admin.sessions',
        path: UrlPaths.SESSION_MANAGEMENT,
        component: () => (<SessionManagementPage />),
    },
    {
        key: 'admin.sessions.tickets',
        path: UrlPaths.ICE_SESSION_TICKETS,
        component: () => (<SessionTicketsPage />),
    },
]

