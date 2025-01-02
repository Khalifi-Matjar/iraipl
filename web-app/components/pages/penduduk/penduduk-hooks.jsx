import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { findPenduduk, listPenduduk } from './penduduk-functions';
import { Button } from '@mui/material';

export const usePenduduk = () => {
    const [pendudukId, setPendudukId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [pendudukTblRows, setPendudukTblRows] = useState([]);
    const pendudukTblColDef = useMemo(
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
                                findPenduduk(value.row.original.id, ({ id, address, pic, contact, email, isActive }) => {
                                    setPendudukId(id);
                                    setFormValue({
                                        address,
                                        pic,
                                        contact,
                                        email,
                                        isActive,
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
            { header: 'Alamat', accessorKey: 'address' },
            { header: 'PIC', accessorKey: 'pic' },
            { header: 'Kontak / WA', accessorKey: 'contact' },
            { header: 'email', accessorKey: 'email' },
        ],
        []
    );

    const pendudukFormDef = useMemo(() => {
        return [
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
                name: 'pic',
                id: 'pic',
                label: 'Penanggung Jawab',
                gridColumn: 4,
                validationSchema: Yup.string().required('Berikan nama penanggung jawab'),
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
                gridColumn: 4,
            },
            {
                name: 'isActive',
                id: 'isActive',
                label: 'Status',
                gridColumn: 12,
                options: [
                    { value: 1, label: 'Aktif' },
                    { value: 0, label: 'Tidak Aktif' },
                ],
                optionsFieldType: 'radio',
                validationSchema: Yup.string().required('Tentukan status penduduk'),
            },
        ];
    }, []);

    useEffect(() => {
        listPenduduk((penduduk) => {
            setPendudukTblRows(penduduk);
        });
    }, []);

    return {
        isFormOpen,
        setIsFormOpen,
        pendudukTblColDef,
        pendudukFormDef,
        pendudukTblRows,
        setPendudukTblRows,
        formValue,
        setFormValue,
        pendudukId,
        setPendudukId,
    };
};
