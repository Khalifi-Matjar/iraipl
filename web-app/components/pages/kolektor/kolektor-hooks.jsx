import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { findData, listData } from './kolektor-functions';

export const useKolektor = () => {
    const [id, setId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [tblRows, setTblRows] = useState([]);
    const tblColDef = useMemo(
        () => [
            {
                header: '',
                accessorKey: 'id',
                size: 30,
                cell: (value) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={() => {
                                findData(value.row.original.id, ({ id, name, contact, email, address }) => {
                                    setId(id);
                                    setFormValue({
                                        name,
                                        contact,
                                        email,
                                        address,
                                    });
                                    setIsFormOpen(true);
                                });
                            }}
                        >
                            Edit
                        </Button>
                    );
                },
            },
            { header: 'Nama', accessorKey: 'name' },
            { header: 'Kontak / WA', accessorKey: 'contact' },
            { header: 'email', accessorKey: 'email' },
            { header: 'Alamat', accessorKey: 'address' },
        ],
        []
    );

    const formDef = useMemo(() => {
        return [
            {
                name: 'name',
                id: 'name',
                label: 'Nama',
                gridColumn: 6,
                validationSchema: Yup.string().required('Berikan nama kolektor'),
            },
            {
                name: 'address',
                id: 'address',
                label: 'Alamat Lengkap',
                gridColumn: 12,
                multiline: true,
                rows: 3,
                validationSchema: Yup.string().required('Berikan alamat lengkap'),
            },
            {
                name: 'contact',
                id: 'contact',
                label: 'No. Whatsapp / Telepon',
                gridColumn: 4,
                validationSchema: Yup.string().required('Berikan no. Whatsapp / no. telepon'),
            },
            {
                name: 'email',
                id: 'email',
                label: 'Email',
                validationSchema: Yup.string().required('Berikan email').email('Format email tidak valid'),
                gridColumn: 4,
            },
        ];
    }, []);

    useEffect(() => {
        // List all data here
        listData((kolektor) => {
            setTblRows(kolektor);
        });
    }, []);

    const updatePasswordFormDef = useMemo(
        () => [
            {
                name: 'password1',
                id: 'password1',
                label: 'Password',
                gridColumn: 6,
                type: 'password',
                validationSchema: Yup.string().required('Berikan password'),
            },
            {
                name: 'password2',
                id: 'password2',
                label: 'Konfirmasi Password',
                gridColumn: 6,
                type: 'password',
                validationSchema: Yup.string()
                    .required('Berikan password yang sama')
                    .oneOf([Yup.ref('password1'), null], 'Password konfirmasi harus sama'),
            },
        ],
        []
    );

    return {
        isFormOpen,
        setIsFormOpen,
        tblColDef,
        formDef,
        tblRows,
        setTblRows,
        formValue,
        setFormValue,
        id,
        setId,

        // kolektor user management purpose
        updatePasswordFormDef,
    };
};
