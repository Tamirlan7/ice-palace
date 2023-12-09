import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IUserResponse, UserRole} from "types/user_types";
import clientAxios from "../services/clientAxios";

interface IUserState {
    id: number | null,
    role: UserRole | null,
    redirect: string | null,
    loading: boolean
}

const initialState: IUserState = {
    id: null,
    role: null,
    redirect: null,
    loading: false,
}

export const getUserThunk = createAsyncThunk(
    "user/getUserThunk",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const user = await clientAxios.get<IUserResponse>("/user");
            return user.data;
        } catch (err: unknown) {
            const e = err as Error;
            dispatch(changeRedirect('/login'))
            console.error(e.message);
            rejectWithValue(e.message);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserId(state, action: PayloadAction<number>) {
            const id: number = action.payload;

            if (id >= 0) {
                state.id = id;
            }
        },
        changeUserRole(state, action: PayloadAction<UserRole>) {
            state.role = action.payload;
        },
        resetRedirect(state) {
            state.redirect = null;
        },
        changeRedirect(state, action: PayloadAction<string>) {
            state.redirect = action.payload
        },
        resetUser(state) {
            state.role = null;
            state.id = null
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserThunk.fulfilled, (state, action: PayloadAction<IUserResponse | undefined>) => {
                state.id = action.payload?.id ?? null;

                if (action.payload?.role === "ROLE_USER") {
                    state.role = UserRole.USER;
                }
                else if (action.payload?.role === "ROLE_ADMIN") {
                    state.role = UserRole.ADMIN;
                }
                
                state.loading = false;
            })
            .addCase(getUserThunk.rejected, (state) => {
                state.loading = false;
            })

})

export const { changeUserId, changeUserRole, resetRedirect, changeRedirect, resetUser } = userSlice.actions
export default userSlice.reducer;
