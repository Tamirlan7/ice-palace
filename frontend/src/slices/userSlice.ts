import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserRole } from "types/user_types";

interface IUserState {
    role: UserRole | null,
    userId: number | null,
}

const initialState: IUserState = {
    role: null,
    userId: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserId(state, action: PayloadAction<number>) {
            const id: number = action.payload;

            if (id >= 0) {
                state.userId = id;
            }
        },
        changeUserRole(state, action: PayloadAction<UserRole>) {
            state.role = action.payload;
        },
    }
})

export const { changeUserId, changeUserRole } = userSlice.actions
export default userSlice.reducer;
