import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { findData, listData } from './master-iuran-functions';

export const useMasterIuran = () => {
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
                                findData(value.row.original.id, ({ id, iuranName, requireCollector }) => {
                                    setId(id);
                                    setFormValue({
                                        iuranName,
                                        requireCollector,
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
            { header: 'Nama Iuran', accessorKey: 'iuranName' },
            { header: 'Butuh Kolektor', accessorKey: 'requireCollector', cell: (value) => (value.row.original.requireCollector === 1 ? 'Butuh kolektor' : 'Tidak butuh kolektor') },
        ],
        []
    );

    const formDef = useMemo(() => {
        return [
            {
                name: 'iuranName',
                id: 'iuranName',
                label: 'Nama Iuran',
                gridColumn: 12,
                validationSchema: Yup.string().required('Berikan nama iuran'),
            },
            {
                name: 'requireCollector',
                id: 'requireCollector',
                label: 'Butuh Kolektor?',
                gridColumn: 12,
                options: [
                    { value: 1, label: 'Ya, butuh kolektor' },
                    { value: 0, label: 'Tidak butuh kolektor' },
                ],
                optionsFieldType: 'radio',
                validationSchema: Yup.string().required('Harap pilih salah satu'),
            },
        ];
    }, []);

    useEffect(() => {
        // List all data here
        listData((iuran) => {
            setTblRows(iuran);
        });
    }, []);

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
    };
};
