import { AuthService, serverAuthService } from '@/nextUtils/authentication';
import { Button } from '@mui/material';
import axios from 'axios';
import nookies from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';


export default function QuizList(props: { userId: number }) {
    const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
        AuthService.cleanAuthToken();
        router.push('/Login', undefined, { shallow: true });
    };

    return (
        <div>
            <h1>Welcome user {props.userId}!</h1>
            <Button
                onClick={handleLogout}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Out
            </Button>
        </div>
    )
}


export async function getServerSideProps(ctx: { req: NextApiRequest, res: NextApiResponse }) {
    const cookies: { [key: string]: string } = nookies.get(ctx);
    if (serverAuthService.isAuthenticated(cookies)) {
        const userId = serverAuthService.getAuthToken(cookies);
        return {
            props: { userId: userId }
        }
    }
    return {
        redirect: {
            destination: '/Login',
            permanent: false,
        },
        props: {}
    }
}
