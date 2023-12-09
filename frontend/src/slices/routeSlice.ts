import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit'
import { HistoryRoute } from 'types/types'

interface IRouteState {
    current: HistoryRoute | null,
    history: HistoryRoute[], 
}

const initialState: IRouteState = {
    current: null,
    history: [],
}

const routeSlice = createSlice({
    name: 'routeSlice',
    initialState,
    reducers: {
        addRouteToHistory(state, action: PayloadAction<string>) {
            state.history.push({
                id: state.history.length,
                route: action.payload,
            });
        },
        nextRouteByHistory(state) {
            if (state.history.length > 0) {
                if (state.current == null) {
                    state.current = state.history[0];
                    return;
                }

                if (state.history[state.current.id + 1]) {
                    state.current = state.history[state.current.id + 1];
                }
            }
        },
        prevRouteByHistory(state) {
            if (state.history.length > 0 && state.current != null && state.current.id !== 0) {
                if (state.history[state.current.id + 1]) {
                    state.current = state.history[state.current.id + 1];
                }
            }
        }
    }
})

export const { addRouteToHistory } = routeSlice.actions
export default routeSlice.reducer