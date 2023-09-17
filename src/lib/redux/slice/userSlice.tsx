import { User } from "@/lib/typings";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: User
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
    }
})

export const { storeUser } = userSlice.actions
export default userSlice.reducer