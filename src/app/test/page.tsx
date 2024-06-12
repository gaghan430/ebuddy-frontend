'use client';

import { Copyright } from "@/components/Copyright";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { updateUserThunk } from "@/redux/thunks/user.thunk";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Box, Container, Snackbar } from "@mui/material";
import Link from '@mui/material/Link';
import { useEffect, useState } from "react";

export default function Test() {
    const { error, isSubmitting } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (error) {
            setIsError(true);
        }
    }, [error])

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={isError}
                autoHideDuration={3000}
                onClose={() => setIsError(false)}>
                <Alert severity="error" variant="filled">{error}</Alert>
            </Snackbar>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <LoadingButton
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={isSubmitting}
                    onClick={() => dispatch(updateUserThunk())}
                >
                    Update Name
                </LoadingButton>

                <Link href="/" variant="body2">
                    <strong>{"Back to login?"}</strong>
                </Link>
            </Box>

            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}