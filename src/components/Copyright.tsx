import { Typography } from "@mui/material";
import Link from "next/link";

export const Copyright: React.FC<any> = (props) => (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https:/ebuddy.gg/">
            Ebuddy
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
)