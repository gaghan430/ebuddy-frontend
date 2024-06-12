import { AuthApi } from "@/apis/auth.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthActions } from "../actions";
import { normalizeHttpError } from "@/utils/error";

export const loginThunk = createAsyncThunk(AuthActions.login,
    async (payload: { email: string, password: string }, thunk) => {
        try {
            const data = await AuthApi.login(payload.email, payload.password)
            return data

        } catch (err: any) {
            return thunk.rejectWithValue(normalizeHttpError(err.response?.data))
        }
    })


export const registerThunk = createAsyncThunk(AuthActions.register,
    async (payload: { email: string, password: string, name: string }, thunk) => {
        try {
            const data = await AuthApi.register(payload.email, payload.password, payload.name)
            return data

        } catch (err: any) {
            return thunk.rejectWithValue(normalizeHttpError(err.response?.data))
        }
    })

