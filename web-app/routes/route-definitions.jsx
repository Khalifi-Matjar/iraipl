import React from 'react';
import {
    Dashboard,
    Home,
    Kolektor,
    KolektorsPortal,
    Login,
    MasterIuran,
    Penduduk,
    PenerimaanIuran,
    Welcome,
} from '../components';

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
    {
        path: '/penerimaan-iuran-kolektor',
        element: <PenerimaanIuran />,
    },
    {
        path: '/penerimaan-iuran-non-kolektor',
        element: <PenerimaanIuran />,
    },
    {
        path: '/kolektors-portal',
        element: <KolektorsPortal />,
    },
];
