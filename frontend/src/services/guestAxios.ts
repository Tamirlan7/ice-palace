import axios from "axios";
import { dispatch } from "../store";
import { changeLoading } from "../slices/generalSlice";
import { API_URL } from "constants/AppConstants";

const guestAxios = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

guestAxios.interceptors.request.use(
    (req) => {
        dispatch(changeLoading(true))
        return req;
    },
    (err) => {
        dispatch(changeLoading(false))
    }
)

guestAxios.interceptors.response.use(
    (res) => {
        if (res.status === 401) {
            
        }

        dispatch(changeLoading(false))
        return res;
    },
    (err) => {
        dispatch(changeLoading(false))
    }
)
export default guestAxios;