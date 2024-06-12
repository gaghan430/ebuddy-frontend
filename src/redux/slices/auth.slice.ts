import { IAuthResponse } from "@/apis/auth.api";
import { IUser } from "@/apis/user.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { destroyCookie } from 'nookies';
import { loginThunk, registerThunk } from "../thunks/auth.thunk";


export interface IAuthState {
    user: IUser | null
    loginError: string
    registerError: string
    isSubmitting: boolean
}

const initialState: IAuthState = {
    user: null,
    loginError: "",
    registerError: "",
    isSubmitting: false,
}


const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        logout(state) {
            state.user = null;
            destroyCookie(null, "ebuddyToken");
            window.location = '/' as any;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.user = action.payload.data.user
                state.loginError = ""
                state.isSubmitting = false
            })
            .addCase(loginThunk.pending, (state, action) => {
                state.loginError = ""
                state.isSubmitting = true
            })
            .addCase(loginThunk.rejected, (state, action: any) => {
                state.loginError = action.payload
                state.isSubmitting = false
            })

            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.user = action.payload.data.user
                state.loginError = ""
                state.isSubmitting = false
            })
            .addCase(registerThunk.pending, (state, action) => {
                state.isSubmitting = true
            })
            .addCase(registerThunk.rejected, (state, action: any) => {
                state.registerError = action.payload
                state.isSubmitting = false
            })
    },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;