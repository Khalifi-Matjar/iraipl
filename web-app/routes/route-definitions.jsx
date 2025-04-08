import React, { useEffect, useState } from 'react';
import {
    Dashboard,
    Kolektor,
    KolektorsPortal,
    LaporanPenerimaanIuran,
    Login,
    MasterIuran,
    Penduduk,
    PenerimaanIuran,
    PenerimaanIuranType,
    Users,
    Welcome,
} from '../components';
import { PenerimaanIuranValidasi } from '../components/pages/penerimaan-iuran/penerimaan-iuran-validasi';
import isNull from 'lodash/isNull';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { findUserDetails } from '../components/pages/users/users-functions';

const KOLEKTOR_ROLE_ID = 5;

const Authorizer = ({ isHomePath = false, isAuthorizeForKolektor }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        findUserDetails()
            .then((userDetails) => {
                setIsAuthenticated(true);
                setUserDetails(userDetails.data.findUser);
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isNull(isAuthenticated) && isNull(userDetails)) {
        return 'Authenticating';
    } else {
        if (isAuthenticated) {
            if (isHomePath) {
                if (userDetails.roleUserId === KOLEKTOR_ROLE_ID) {
                    return <Navigate to="/kolektors-portal" />;
                } else {
                    return <Navigate to="/master-iuran" />;
                }
            } else {
                if (
                    (isAuthorizeForKolektor &&
                        userDetails.roleUserId === KOLEKTOR_ROLE_ID) ||
                    (!isAuthorizeForKolektor &&
                        userDetails.roleUserId !== KOLEKTOR_ROLE_ID)
                ) {
                    return <Outlet />;
                } else if (
                    isAuthorizeForKolektor &&
                    userDetails.roleUserId !== KOLEKTOR_ROLE_ID
                ) {
                    return <Navigate to="/master-iuran" />;
                } else if (
                    !isAuthorizeForKolektor &&
                    userDetails.roleUserId === KOLEKTOR_ROLE_ID
                ) {
                    return <Navigate to="/kolektors-portal" />;
                }
            }
        } else {
            return <Navigate to="/login" />;
        }
    }
};

Authorizer.propTypes = {
    isHomePath: PropTypes.bool,
    isAuthorizeForKolektor: PropTypes.bool,
};

export const routesDefinitions = [
    {
        path: '/',
        element: <Authorizer isHomePath={true} />,
    },
    {
        element: <Authorizer isAuthorizeForKolektor={false} />,
        children: [
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
                element: (
                    <PenerimaanIuran type={PenerimaanIuranType.WITH_KOLEKTOR} />
                ),
            },
            {
                path: '/penerimaan-iuran-non-kolektor',
                element: (
                    <PenerimaanIuran
                        type={PenerimaanIuranType.WITHOUT_KOLEKTOR}
                    />
                ),
            },
            {
                path: '/penerimaan-iuran-validasi',
                element: <PenerimaanIuranValidasi />,
            },
            {
                path: '/laporan-penerimaan-iuran',
                element: <LaporanPenerimaanIuran />,
            },
            {
                path: '/manage-user',
                element: <Users />,
            },
        ],
    },
    {
        element: <Authorizer isAuthorizeForKolektor={true} />,
        children: [
            {
                path: '/kolektors-portal',
                element: <KolektorsPortal />,
            },
        ],
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
