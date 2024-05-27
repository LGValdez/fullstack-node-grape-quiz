import axios from 'axios';
import router from 'next/router';
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import nookies from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService, serverAuthService } from '@/nextUtils/authentication';

const defaultTheme = createTheme();


export default function Login() {
    const [failedLogin, setFailedLogin] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const response = await axios.get(`http://localhost:8000/users`, {
            params: { email: data.get('email'), password: data.get('password') }
        })
        if (response.status == 200 && response.data.length == 1) {
            const userId = response.data[0].id;
            AuthService.setAuthToken(userId);
            router.push('/QuizList', undefined, { shallow: true});
        } else {
            setFailedLogin(true);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    {(failedLogin) ? <Alert severity="error">Failed Login Attempt. Try with a different email or password.</Alert> : <></>}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


export async function getServerSideProps(ctx: { req: NextApiRequest, res: NextApiResponse }) {
    const cookies: { [key: string]: string } = nookies.get(ctx);
    if (serverAuthService.isAuthenticated(cookies)) {
        const userId = serverAuthService.getAuthToken(cookies);
        return {
            redirect: {
                destination: '/QuizList',
                permanent: false,
            },
            props: {}
        }
    }
    return { props: {} };
}
