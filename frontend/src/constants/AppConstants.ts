import { IMenuItem } from "types/types";

export const API_URL = 'http://localhost:8080/api/v1'
export const USER_PREFIX_PATH = '/user';
export const ADMIN_PREFIX_PATH = '/admin';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/';
export const AUTHENTICATED_ADMIN_ENTRY = `${ADMIN_PREFIX_PATH}`;
export const AUTHENTICATED_USER_ENTRY = `${USER_PREFIX_PATH}`;
export const UNAUTHENTICATED_ENTRY = '/home';
export const HOME_PAGE = '/home';

export enum UrlPaths {
    HOME = '/home',
    ABOUT = '/about',
    RULES = '/rules',
    CONTACTS = '/contacts',
    SESSIONS_DATE = '/sessions/date',
    TICKET = '/ticket',
    ADMIN = '/admin',
    SESSION_MANAGEMENT = '/admin/sessions',
    LOGIN = '/login',
    ICE_SESSION_TICKETS = '/ice-session/:sessionId/tickets'
}

export const stickyButtonAllowedPaths: string[] = [
    UrlPaths.HOME,
]

export const menuItems: IMenuItem[] = [
    {
        text: 'Контакты',
        url: UrlPaths.CONTACTS,
    },
    {
        text: 'Правила',
        url: UrlPaths.RULES,
    },
    {
        text: 'О Нас',
        url: UrlPaths.ABOUT,
    },
]
