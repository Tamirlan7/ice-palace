import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import clientAxios from 'services/clientAxios'
import { IOrder, RequestOrder } from 'types/types'

interface IOrderState {
    loading: boolean
    order: IOrder | null
}

const initialState: IOrderState = {
    loading: false,
    order: null
}

export const createOderThunk = createAsyncThunk(
    'orderSlice/createOder',
    async (data: RequestOrder, { rejectWithValue }) => {
        try {
            const response = await clientAxios.post<IOrder>('/order', data)
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(createOderThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(createOderThunk.fulfilled, (store, action: PayloadAction<IOrder | undefined>) => {
                store.loading = false;

                if (action.payload) {
                    store.order = action.payload
                }
            })
            .addCase(createOderThunk.rejected, (store) => {
                store.loading = false;
            })
})

export const {} = orderSlice.actions
export default orderSlice.reducer