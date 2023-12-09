import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import clientAxios from 'services/clientAxios'
import { ISession, ISessionNoId, IceSessions, dayCategory } from 'types/types'
import convertDayCategory, { convertDayCategoryBackwards } from 'utils/convertDayCategory'
import formatSession from 'utils/formatSession'
import formatSessions from 'utils/formatSessions'
import formatTime from 'utils/formatTime'


interface IIceSessionState {
    iceSessions: IceSessions
    allowedSessions: ISession[]
    loading: boolean
    selectedIceSession: ISession | null
}

const initialState: IIceSessionState = {
    iceSessions: {
        festiveDaysOrWeekends: [],
        weekdays: [],
    },
    allowedSessions: [],
    loading: false,
    selectedIceSession: null,
}

export const deleteSessionThunk = createAsyncThunk(
    'iceSessionSlice/deleteSession',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await clientAxios.delete(`/ice-session/${id}`)

            if (response.status < 400) {
                return id;
            }
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

export const getAllowedSessionsThunk = createAsyncThunk(
    'iceSessionSlice/getAllowedSessions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientAxios.get<ISession[]>('/ice-session/allowed')
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

export const getIceSessionByIdThunk = createAsyncThunk(
    'iceSessionSlice/getIceSessionById',
    async (sessionId: number, { rejectWithValue }) => {
        try {
            const response = await clientAxios.get<ISession>(`/ice-session/${sessionId}`)
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

export const addSessionThunk = createAsyncThunk(
    'iceSessionSlice/addSession',
    async (data: ISession | ISessionNoId, { rejectWithValue }) => {
        try {
            const response = await clientAxios.post<ISession>('/ice-session', data)
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

export const updateSessionThunk = createAsyncThunk(
    'iceSessionSlice/updateSession',
    async (data: ISessionNoId, { rejectWithValue }) => {
        try {
            const response = await clientAxios.put<ISession>(`/ice-session/${data.id}`, {
                ...data,
                'dayCategory': convertDayCategoryBackwards(data.dayCategory as dayCategory),
            })
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

export const getIceSessionsThunk = createAsyncThunk(
    'iceSessionSlice/getIceSessions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientAxios.get<IceSessions>('/ice-session')
            return response.data
        }
        catch(err: unknown) {
            const e = err as Error
            console.error(e.message)
            rejectWithValue(e.message)
        }
    }
)

const iceSessionSlice = createSlice({
    name: 'iceSessionSlice',
    initialState,
    reducers: {
        sortSessions(store) {
        }
    },
    extraReducers: builder => 
        builder
            .addCase(getIceSessionsThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(getIceSessionsThunk.fulfilled, (store, action: PayloadAction<IceSessions | undefined>) => {
                if (action.payload) {
                    store.iceSessions = {
                        festiveDaysOrWeekends: formatSessions(action.payload.festiveDaysOrWeekends),
                        weekdays: formatSessions(action.payload.weekdays)
                    }

                    store.iceSessions = {
                        festiveDaysOrWeekends: action.payload.festiveDaysOrWeekends.sort((sessionA, sessionB) => sessionA.sessionCount - sessionB.sessionCount),
                        weekdays: action.payload.weekdays.sort((sessionA, sessionB) => sessionA.sessionCount - sessionB.sessionCount),
                    }
                }
                store.loading = false;
            })
            .addCase(getIceSessionsThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(getAllowedSessionsThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(getAllowedSessionsThunk.fulfilled, (store, action: PayloadAction<ISession[] | undefined>) => {
                store.loading = false;  
                if (action.payload) {
                    store.allowedSessions = formatSessions(action.payload)
                    store.allowedSessions = action.payload.sort((sessionA, sessionB) => sessionA.sessionCount - sessionB.sessionCount);
                }
            })
            .addCase(getAllowedSessionsThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(addSessionThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(addSessionThunk.fulfilled, (store, action: PayloadAction<ISession | undefined>) => {
                if (action.payload) {
                    switch (action.payload.dayCategory) {
                        case "WEEKDAY":
                            store.iceSessions.weekdays.push(formatSession(action.payload))
                            break;
                        case "WEEKEND_OR_FESTIVE_DAY":
                            store.iceSessions.festiveDaysOrWeekends.push(formatSession(action.payload))
                            break;
                    }
                }
                store.loading = false;
            })
            .addCase(addSessionThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(deleteSessionThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(deleteSessionThunk.fulfilled, (store, action: PayloadAction<number | undefined>) => {
                if (action.payload) {
                    store.iceSessions = {
                        festiveDaysOrWeekends: store.iceSessions.festiveDaysOrWeekends.filter((session) => session.id !== action.payload),
                        weekdays: store.iceSessions.weekdays.filter((session) => session.id !== action.payload)
                    }
                }

                store.loading = false;
            })
            .addCase(deleteSessionThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(updateSessionThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(updateSessionThunk.fulfilled, (store, action: PayloadAction<ISession | undefined>) => {
                if (action.payload) {
                    store.iceSessions = {
                        weekdays: store.iceSessions.weekdays.map((session) => {
                            if (session.id === action.payload?.id) {
                                return formatSession(action.payload)
                            }

                            return session
                        }),
                        festiveDaysOrWeekends: store.iceSessions.festiveDaysOrWeekends.map((session) => {
                            if (session.id === action.payload?.id) {
                                return formatSession(action.payload)
                            }

                            return session
                        })
                    }
                }
                store.loading = false;
            })
            .addCase(updateSessionThunk.rejected, (store) => {
                store.loading = false;
            })

            .addCase(getIceSessionByIdThunk.pending, (store) => {
                store.loading = true;
            })
            .addCase(getIceSessionByIdThunk.fulfilled, (store, action: PayloadAction<ISession | undefined>) => {
                store.loading = false;

                if (action.payload) {
                    store.selectedIceSession = action.payload;
                }
            })
            .addCase(getIceSessionByIdThunk.rejected, (store) => {
                store.loading = false;
            })
})

export const { sortSessions } = iceSessionSlice.actions
export default iceSessionSlice.reducer