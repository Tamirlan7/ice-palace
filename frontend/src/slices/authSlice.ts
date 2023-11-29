import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ILoginRequest, IRegisterRequest, IToken } from '../types/authentication_types';
import guestAxios from '../services/guestAxios';
import { TOKEN } from 'constants/AppConstants';


interface IAuthState {

}
 
const initialState: IAuthState = {

}

export const registerThunk = createAsyncThunk(
    'auth/registerThunk', 
    async (data: IRegisterRequest, { rejectWithValue, dispatch }) => {
        try {
            const response = await guestAxios.post('/auth/sign-up', data)

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

export const loginThunk = createAsyncThunk(
    'auth/loginThunk', 
    async (data: ILoginRequest, { rejectWithValue, dispatch }) => {
        try {
            const response = await guestAxios.post<IToken>('/auth/sign-in', data)

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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => 
        builder
            .addCase(registerThunk.pending, (state, action) => {

            })
            .addCase(registerThunk.fulfilled, (state, action) => {

            })
            .addCase(registerThunk.rejected, (state, action) => {

            })

            .addCase(loginThunk.pending, (state, action) => {
                
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<IToken | undefined>) => {
                if (action.payload) {
                    localStorage.setItem(TOKEN, JSON.stringify(action.payload))
                }
            })
            .addCase(loginThunk.rejected, (state, action) => {

            })
})

export default authSlice.reducer
