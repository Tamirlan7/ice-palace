import axios from "axios";
import { API_URL, TOKEN } from "../constants/AppConstants";
import { IToken } from "types/authentication_types";

const storageToken = localStorage.getItem(TOKEN);
let token: IToken| undefined;

if (storageToken) {
    token = JSON.parse(storageToken);
}

const clientAxios = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.accessToken}`
    }
});

clientAxios.interceptors.request.use(
    (req) => {
        return req;
    },
    (err) => {
        Promise.reject(err);
    }
)

clientAxios.interceptors.response.use(
    (res) => {
        if (res.status === 401) {
            
        }

        return res;
    },
    (err) => {
        Promise.reject(err);
    }
)
export default clientAxios;