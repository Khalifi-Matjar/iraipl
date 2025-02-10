import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import {
    deleteRetribution,
    findPenduduk,
    listPenduduk,
} from './penduduk-functions';
import { Button } from '@mui/material';
import { formatDate, formatMoney } from '../../../utils';
import { listData as listIuranData } from '../master-iuran/master-iuran-functions';

export const usePenduduk = () => {
    const [pendudukId, setPendudukId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [pendudukTblRows, setPendudukTblRows] = useState([]);
    const [jenisIuran, setJenisIuran] = useState([]);
    const [retributionList, setRetributionList] = useState([]);
    const [formIuranFormValue, setFormIuranFormValue] = useState({});
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
                                findPenduduk(
                                    value.row.original.id,
                                    ({
                                        id,
                                        address,
                                        pic,
                                        contact,
                                        email,
                                        isActive,
                                        NilaiIuranPenduduks,
                                    }) => {
                                        setPendudukId(id);
                                        setFormValue({
                                            address,
                                            pic,
                                            contact,
                                            email,
                                            isActive,
                                            NilaiIuranPenduduks,
                                        });
                                        setRetributionList(NilaiIuranPenduduks);
                                        setIsFormOpen(true);
                                    }
                                );
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
                validationSchema: Yup.string().required(
                    'Berikan alamat lengkap'
                ),
            },
            {
                name: 'pic',
                id: 'pic',
                label: 'Penanggung Jawab',
                gridColumn: 4,
                validationSchema: Yup.string().required(
                    'Berikan nama penanggung jawab'
                ),
            },
            {
                name: 'contact',
                id: 'contact',
                label: 'No. Whatsapp / Telepon',
                gridColumn: 4,
                validationSchema: Yup.string().required(
                    'Berikan no. Whatsapp / no. telepon'
                ),
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
                validationSchema: Yup.string().required(
                    'Tentukan status penduduk'
                ),
            },
        ];
    }, []);

    const formIuranFormDef = useMemo(
        () => [
            {
                name: 'startDate',
                id: 'startDate',
                label: 'Per Tanggal',
                gridColumn: 4,
                type: 'date',
                validationSchema: Yup.string().required(
                    'Berikan per tgl berapa nilai iuran ini dimulai'
                ),
            },
            {
                name: 'iuranId',
                id: 'iuranId',
                label: 'Jenis Iuran',
                gridColumn: 4,
                options: jenisIuran.map(({ id, iuranName }) => ({
                    value: id,
                    label: iuranName,
                })),
                validationSchema: Yup.number().required('Pilih jenis iuran'),
            },
            {
                name: 'amount',
                id: 'amount',
                label: 'nilai',
                gridColumn: 4,
                type: 'number',
                validationSchema: Yup.number('Berikan angka').required(
                    'Berikan per tgl berapa nilai iuran ini dimulai'
                ),
            },
        ],
        [jenisIuran]
    );

    const formIuranTblColDef = useMemo(
        () => [
            {
                header: '',
                accessorKey: 'id',
                size: 100,
                cell: ({ row }) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={() => {
                                deleteRetribution(
                                    row.original.id,
                                    ({ success }) => {
                                        if (success) {
                                            findPenduduk(
                                                pendudukId,
                                                ({ NilaiIuranPenduduks }) => {
                                                    setRetributionList(
                                                        NilaiIuranPenduduks
                                                    );
                                                }
                                            );
                                        }
                                    }
                                );
                            }}
                            color="error"
                        >
                            Hapus
                        </Button>
                    );
                },
            },
            {
                header: 'Per Tanggal',
                accessorKey: 'startDate',
                cell: ({ row }) => formatDate(row.original.startDate),
            },
            { header: 'Jenis Iuran', accessorKey: 'retributionName' },
            {
                header: 'Nilai',
                accessorKey: 'amount',
                align: 'right',
                cell: ({ row }) => formatMoney(row.original.amount),
            },
        ],
        [pendudukId]
    );

    const formIuranTblData = useMemo(
        () =>
            retributionList.map(({ id, startDate, amount, MasterIuran }) => ({
                id,
                startDate,
                amount,
                retributionName: MasterIuran.iuranName,
            })),
        [retributionList]
    );

    useEffect(() => {
        // Get list all penduduk
        listPenduduk((penduduk) => {
            setPendudukTblRows(penduduk);
        });

        // Get list all iuran / retribution
        listIuranData((iuran) => setJenisIuran(iuran));
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
        setRetributionList,
        formIuranFormDef,
        formIuranFormValue,
        setFormIuranFormValue,
        formIuranTblColDef,
        formIuranTblData,
    };
};
