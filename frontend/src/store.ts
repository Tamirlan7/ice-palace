import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import generalSlice from "./slices/generalSlice";
import userSlice from "slices/userSlice";
import iceSessionSlice from "slices/iceSessionSlice";
import ticketSlice from "slices/ticketSlice";
import orderSlice from "slices/orderSlice";


const store = configureStore({
    reducer: {
        'auth': authSlice,
        'general': generalSlice,
        'user': userSlice,
        'iceSession': iceSessionSlice,
        'ticket': ticketSlice,
        'order': orderSlice,
    },
    devTools: process.env.NODE_ENV === "development",
});

export const { dispatch } = store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
