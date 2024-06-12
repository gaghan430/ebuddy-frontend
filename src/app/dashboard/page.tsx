import { UserApi } from "@/apis/user.api";
import { Copyright } from "@/components/Copyright";
import { NameLabel } from "@/components/NameLabel";
import { Box, Container } from "@mui/material";
import { cookies } from "next/headers";

export default async function Dashboard() {
    // SSR REQUEST
    const user = await UserApi.getMe(cookies().get('ebuddyToken')?.value || '');

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <NameLabel user={user} />
            </Box>

            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}