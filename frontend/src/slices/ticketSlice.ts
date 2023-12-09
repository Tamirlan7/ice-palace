import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import clientAxios from 'services/clientAxios'
import { ISession, ITicket, ITicketRequest } from 'types/types'

interface ITicketState {
    loading: boolean
    selectedSession: ISession | null
    adultEntryTicketCount: number
    childEntryTicketCount: number
    adultIceSkateCount: number
    childIceSkateCount: number,
    userPhone: string,

    selectedSessionTickets: ITicket[]
}

const initialState: ITicketState = {
    loading: false,
    selectedSession: null,
    adultEntryTicketCount: 0,
    childEntryTicketCount: 0,
    adultIceSkateCount: 0,
    childIceSkateCount: 0,
    userPhone: '',
    selectedSessionTickets: []
}

export const purchaseTicketThunk = createAsyncThunk(
    'ticketSlice/purchaseTicket',
    async (data: ITicketRequest, { rejectWithValue }) => {
        try {
            const response = await clientAxios.post(`/ticket/purchase`, data)
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

export const getIceSessionTicketsThunk = createAsyncThunk(
    'ticketSlice/getIceSessionTickets',
    async (sessionId: number, { rejectWithValue }) => {
        try {
            const response = await clientAxios.get<ITicket[]>(`/ticket/ice-session/${sessionId}`)
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

const ticketSlice = createSlice({
    name: 'ticketSlice',
    initialState,
    reducers: {
        setSelectedSession(store, action: PayloadAction<ISession>) {
            store.selectedSession = action.payload
        },
        setAdultEntryTicketCount(store, action: PayloadAction<number>) {
            store.adultEntryTicketCount = action.payload
        },
        setChildEntryTicketCount(store, action: PayloadAction<number>) {
            store.childEntryTicketCount = action.payload;
        },
        setAdultIceSkateCount(store, action: PayloadAction<number>) {
            store.adultIceSkateCount = action.payload
        },
        setChildIceSkateCount(store, action: PayloadAction<number>) {
            store.childIceSkateCount = action.payload;
        },
        setPhoneReducer(store, action: PayloadAction<string>) {
            store.userPhone = action.payload;
        }
    },
    extraReducers: builder => 
        builder
            .addCase(purchaseTicketThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(purchaseTicketThunk.fulfilled, (store, action: PayloadAction<ITicket | undefined>) => {
                store.loading = false;
                
            })
            .addCase(purchaseTicketThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(getIceSessionTicketsThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(getIceSessionTicketsThunk.fulfilled, (store, action: PayloadAction<ITicket[] | undefined>) => {
                if (action.payload) {
                    store.selectedSessionTickets = action.payload
                }
                
                store.loading = false;
            })
            .addCase(getIceSessionTicketsThunk.rejected, (store) => {
                store.loading = false;
            })
})

export const { 
    setSelectedSession, 
    setAdultEntryTicketCount, 
    setChildEntryTicketCount, 
    setAdultIceSkateCount, 
    setChildIceSkateCount,
    setPhoneReducer,
 } = ticketSlice.actions
export default ticketSlice.reducer