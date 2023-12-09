import axios from "axios";
import { API_URL } from "../constants/AppConstants";

const csrfToken: string = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

const clientAxios = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken
    },
    withCredentials: true,
});

export default clientAxios;
