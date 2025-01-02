import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { getIuran } from './master-iuran-functions';
import isUndefined from 'lodash/isUndefined';

const buildIuranformDef = (iuran) => [
    {
        name: 'iuranName',
        id: 'iuranName',
        label: 'Nama iuran',
        gridColumn: 12,
        initialValue: isUndefined(iuran) ? undefined : iuran.iuranName,
        validationSchema: Yup.string().required('Berikan nama iuran'),
    },
    {
        name: 'requireCollector',
        id: 'requireCollector',
        label: 'Butuh kolektor?',
        gridColumn: 6,
        initialValue: isUndefined(iuran) ? undefined : iuran.requireCollector.toString(),
        options: [
            { value: 1, label: 'Butuh kolektor' },
            { value: 0, label: 'Tidak membutuhkan kolektor' },
        ],
        validationSchema: Yup.string().required('Pilih apakah butuh kolektor?'),
    },
];

export const useMasterIuranHooks = () => {
    const [iuranMasterId, setIuranMasterId] = useState(null);
    const [iuranMasterTableData, setIuranMasterTableData] = useState([]);
    const [iuranFormDefinition, setIuranFormDefinition] = useState(buildIuranformDef());
    const iuranMasterTableColDef = useMemo(() => [
        {
            header: 'No',
            accessorKey: 'no',
        },
        {
            header: 'Nama Iuran',
            accessorKey: 'iuranName',
        },
        {
            header: 'Butuh Collector',
            accessorKey: 'requireCollector',
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (value) => {
                return (
                    <Button
                        variant="contained"
                        onClick={() =>
                            getIuran(({ iuran }) => {
                                setIuranFormDefinition(buildIuranformDef(iuran));
                                setIuranMasterId(iuran.id);
                            }, value.row.original.id)
                        }
                    >
                        Edit
                    </Button>
                );
            },
        },
    ]);

    useEffect(() => {
        getIuran(({ iuran }) => {
            setIuranMasterTableData(
                iuran.map(({ id, iuranName, requireCollector }, index) => ({
                    no: index + 1,
                    id,
                    requireCollector: requireCollector ? 'Butuh collector' : 'Tidak membutuhkan collector',
                    iuranName,
                }))
            );
        });
    }, []);

    return {
        iuranMasterId,
        iuranMasterTableColDef,
        iuranMasterTableData,
        setIuranMasterTableData,
        iuranFormDefinition,
        resetForm: () => {
            setIuranFormDefinition(buildIuranformDef());
            setIuranMasterId(null);
        },
    };
};
