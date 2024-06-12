import { UserApi } from "@/apis/user.api";
import { normalizeHttpError } from "@/utils/error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserActions } from "../actions";

export const updateUserThunk = createAsyncThunk(UserActions.update,
    async (payload, thunk) => {
        try {
            const data = await UserApi.updateMe();
            return data

        } catch (err: any) {
            return thunk.rejectWithValue(normalizeHttpError(err.response?.data))
        }
    })


