import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IGeneralState {
    loading: boolean,
}

const initialState: IGeneralState = {
    loading: false,
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        changeLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
})

export const { changeLoading } = generalSlice.actions;
export default generalSlice.reducer;
