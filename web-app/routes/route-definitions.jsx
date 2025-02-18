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
import { PenerimaanIuranValidasi } from '../components/pages/penerimaan-iuran/penerimaan-iuran-validasi';
import { PenerimaanIuranType } from '../components/pages/penerimaan-iuran/penerimaan-iuran-page';

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
        element: <PenerimaanIuran type={PenerimaanIuranType.WITH_KOLEKTOR} />,
    },
    {
        path: '/penerimaan-iuran-non-kolektor',
        element: (
            <PenerimaanIuran type={PenerimaanIuranType.WITHOUT_KOLEKTOR} />
        ),
    },
    {
        path: '/penerimaan-iuran-validasi',
        element: <PenerimaanIuranValidasi />,
    },
    {
        path: '/kolektors-portal',
        element: <KolektorsPortal />,
    },
];
