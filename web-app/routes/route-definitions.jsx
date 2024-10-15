import React from 'react';
import { Dashboard, Home, Login, Welcome } from '../components';

export const routesDefinitions = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/welcome',
        element: <Welcome />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
];
