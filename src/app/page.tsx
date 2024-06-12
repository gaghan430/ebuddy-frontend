'use client'

import { Copyright } from '@/components/Copyright';
import FormInputText from '@/components/FormInputText';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { loginThunk } from '@/redux/thunks/auth.thunk';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Snackbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const defaultValues = {
  email: "",
  password: "",
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

type Schema = yup.InferType<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isSubmitting, loginError, user } = useAppSelector(state => state.auth);
  const [isError, setIsError] = useState(false);

  const { handleSubmit, control, formState: { isDirty, isValid } } = useForm<Schema>({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: Schema) => dispatch(loginThunk({ email: data.email, password: data.password }));

  useEffect(() => {
    if (loginError) {
      setIsError(true);
    }
  }, [loginError])

  useEffect(() => {
    if (user) {
      router.push(searchParams.get('redirect') || '/dashboard');
    }
  }, [user])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isError}
        autoHideDuration={3000}
        onClose={() => setIsError(false)}>
        <Alert severity="error" variant="filled">{loginError}</Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>


        <Box sx={{ mt: 1 }}>
          <FormInputText name="email" control={control} label="Email" />
          <FormInputText type="password" name="password" control={control} label="Password" />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isDirty || !isValid}
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </LoadingButton>

          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>

        <div style={{ marginTop: '50px' }}>
          <Link href="/test" variant="body2">
            <strong>{"Test Update Data Without Login"}</strong>
          </Link>
        </div>

      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}