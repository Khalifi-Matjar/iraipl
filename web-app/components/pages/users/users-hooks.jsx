import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import {
    addUserNonKolektor,
    getUsersNonKolektor,
    updateUserNonKolektor,
} from './users-functions';
import isEmpty from 'lodash/isEmpty';

export const useUsers = ({ onRowButtonClick }) => {
    const [usersNonKolektor, setUsersNonKolektor] = useState([]);
    const [formValue, setFormValue] = useState({});

    const tblColDef = useMemo(
        () => [
            {
                header: '',
                accessorKey: 'id',
                size: 30,
                cell: ({ row }) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={() => {
                                setFormValue({
                                    email: row.original.email,
                                    name: row.original.name,
                                    roleUserId: row.original.roleUserId,
                                });
                                onRowButtonClick(row.original);
                            }}
                        >
                            Edit
                        </Button>
                    );
                },
            },
            { header: 'Nama', accessorKey: 'name' },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Role', accessorKey: 'RoleUser.role' },
        ],
        [usersNonKolektor]
    );

    const formDef = useMemo(
        () => [
            {
                name: 'email',
                id: 'email',
                label: 'Email',
                gridColumn: 4,
                validationSchema: Yup.string()
                    .email('Format email tidak benar')
                    .required('Masukkan email'),
            },
            {
                name: 'name',
                id: 'name',
                label: 'Nama',
                gridColumn: 4,
                validationSchema: Yup.string().required('Masukkan nama'),
            },
            {
                name: 'roleUserId',
                id: 'roleUserId',
                label: 'Role',
                gridColumn: 4,
                options: [
                    { label: 'Admin Aplikasi', value: 2 },
                    { label: 'Admin Pengelolaan', value: 3 },
                    { label: 'Bidang Pengelolaan', value: 4 },
                ],
                validationSchema: Yup.string().required('Pilih role'),
            },
            {
                name: 'password1',
                id: 'password1',
                label: 'Password',
                gridColumn: 6,
                type: 'password',
                validationSchema: isEmpty(formValue)
                    ? Yup.string().required('Berikan password')
                    : Yup.string(),
            },
            {
                name: 'password2',
                id: 'password2',
                label: 'Ulangi Password',
                gridColumn: 6,
                type: 'password',
                validationSchema: isEmpty(formValue)
                    ? Yup.string()
                          .required('Ulangi password yang sama')
                          .oneOf(
                              [Yup.ref('password1'), null],
                              'Password konfirmasi harus sama'
                          )
                    : Yup.string().oneOf(
                          [Yup.ref('password1'), null],
                          'Password konfirmasi harus sama'
                      ),
            },
        ],
        [formValue]
    );

    return {
        tblColDef,
        getUsersNonKolektor,
        usersNonKolektor,
        setUsersNonKolektor,
        addUserNonKolektor,
        updateUserNonKolektor,
        formDef,
        formValue,
        setFormValue,
    };
};
