import React from 'react';
import { Dashboard, Home, Kolektor, Login, MasterIuran, Penduduk, Welcome } from '../components';

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
    {
        path: '/master-iuran',
        element: <MasterIuran />,
    },
    {
        path: '/penduduk',
        element: <Penduduk />,
    },
    {
        path: '/kolektor',
        element: <Kolektor />,
    },
];
