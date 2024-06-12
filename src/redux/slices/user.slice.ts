import { IUser, IUserResponse } from "@/apis/user.api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { updateUserThunk } from "../thunks/user.thunk";

export interface IUserState {
    user: IUser | null
    error: string
    isSubmitting: boolean
}

const initialState: IUserState = {
    user: null,
    error: "",
    isSubmitting: false,
}

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<IUserResponse>) => {
                state.user = action.payload.data
                state.error = ""
                state.isSubmitting = false
            })
            .addCase(updateUserThunk.pending, (state, action) => {
                state.error = ""
                state.isSubmitting = true
            })
            .addCase(updateUserThunk.rejected, (state, action: any) => {
                state.error = action.payload
                state.isSubmitting = false
            })
    },
});

export default userSlice.reducer;
