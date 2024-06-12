'use client';

import { IUserResponse } from "@/apis/user.api"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { logout } from "@/redux/slices/auth.slice";
import { updateUserThunk } from "@/redux/thunks/user.thunk";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Link, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
    user: IUserResponse;
}

export const NameLabel: React.FC<IProps> = ({ user }) => {
    const [userdata, setUserData] = useState(user.data);
    const [isError, setIsError] = useState(false);
    const { error, isSubmitting, user: userredux } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            setIsError(true);
        }
    }, [error])

    useEffect(() => {
        if (userredux) {
            setUserData(userredux);
        }
    }, [userredux])

    return (<>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isError}
            autoHideDuration={3000}
            onClose={() => setIsError(false)}>
            <Alert severity="error" variant="filled">{error}</Alert>
        </Snackbar>

        <div>{userdata.name} - {userdata.email}</div>
        <p><small>hit the button to update the name with random suffix</small></p>
        <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
            onClick={() => dispatch(updateUserThunk())}
        >
            Update Name
        </LoadingButton>

        <Link
            component="button"
            variant="body2"
            onClick={() => {
                dispatch(logout());
            }}>
            Logout
        </Link>
    </>
    )
}
