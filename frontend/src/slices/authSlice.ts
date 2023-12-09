import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {ILoginRequest, IRegisterRequest} from "../types/authentication_types";
import clientAxios from "../services/clientAxios";
import { changeUserRole, getUserThunk, resetUser } from './userSlice';


interface IAuthState {
    loading: boolean
}
 
const initialState: IAuthState = {
    loading: false,
}

export const registerThunk = createAsyncThunk(
    'auth/registerThunk',
    async (data: IRegisterRequest, { rejectWithValue }) => {
        try {
            const response = await clientAxios.post('/auth/sign-up', data)

            if (response.status >= 400) {
                rejectWithValue(response.data)
            }
            else {
                return response.data;
            }
        }
        catch(e: unknown) {
            const err = e as Error;
            rejectWithValue(err.message)
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await clientAxios.post('/auth/sign-out')
            if (response.status < 400) {
                dispatch(resetUser())
            }
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (data: ILoginRequest, { rejectWithValue, dispatch }) => {
        try {
            const response = await clientAxios.post('/auth/sign-in', data)

            if (response.status >= 400) {
                rejectWithValue(response.data)
            }
            else {
                dispatch(getUserThunk());
                return response.data;
            }
        }
        catch(e: unknown) {
            const err = e as Error;
            rejectWithValue(err.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>
        builder
            .addCase(registerThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(registerThunk.fulfilled, (store) => {
                store.loading = false;
                
            })
            .addCase(registerThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(loginThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(loginThunk.fulfilled, (store) => {
                store.loading = false;
                
            })
            .addCase(loginThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(logoutThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(logoutThunk.fulfilled, (store) => {
                store.loading = false;
            })
            .addCase(logoutThunk.rejected, (store) => {
                store.loading = false;
            })
})

export default authSlice.reducer
