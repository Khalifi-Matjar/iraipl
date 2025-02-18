import React, { useContext, useMemo, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import omit from 'lodash/omit';
import { FormBuilder } from '../../organisms/form-builder';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import { Button, Divider, Typography } from '@mui/material';
import {
    dateFormat,
    formatDate,
    LOCAL_STORAGE_TOKEN_KEY,
} from '../../../utils';
import { SnackbarContext } from '../../context/snackbar-context';
import { LocalTable } from '../../organisms/local-table';
import { PendudukCard } from '../../organisms/penduduk-card';
import { TabLayoutContext } from '../../organisms/tab-layout';
import { monthList } from '../../../utils/constants';
import { usePenduduk } from '../penduduk/penduduk-hooks';
import {
    PenerimaanIuranPageContext,
    PenerimaanIuranType,
} from './penerimaan-iuran-page';
import { ConfirmationContext } from '../../context/confirmation-context';

export const PenerimaanIuranFormInput = ({ kolektor }) => {
    const penerimaanIuranPage = useContext(PenerimaanIuranPageContext);
    const tabLayout = useContext(TabLayoutContext);
    const snackbar = useContext(SnackbarContext);
    const confirmation = useContext(ConfirmationContext);
    const {
        pendudukTblColDef,
        pendudukTblRows,
        pendudukFormDef,
        jenisIuran,
        filterPenduduk,
    } = usePenduduk(true);

    const [choosenPenduduk, setChoosenPenduduk] = useState(null);

    const formDefinition = useMemo(() => {
        const baseDefinition = [
            {
                name: 'iuranId',
                id: 'iuranId',
                label: 'Nama Iuran',
                gridColumn: 6,
                options: jenisIuran
                    .filter(
                        ({ requireCollector }) =>
                            Boolean(requireCollector) ===
                            (penerimaanIuranPage.type ===
                                PenerimaanIuranType.WITH_KOLEKTOR)
                    )
                    .map(({ id, iuranName }) => ({
                        label: iuranName,
                        value: id,
                    })),
                validationSchema: Yup.string().required('Berikan nama iuran'),
            },
            {
                name: 'amount',
                id: 'amount',
                label: 'Jumlah / nilai',
                gridColumn: 3,
                type: 'number',
                validationSchema: Yup.number().required(
                    'Jumlah / nilai harus angka'
                ),
            },
            {
                name: 'transactionDate',
                id: 'transactionDate',
                label: 'Tgl. transaksi',
                gridColumn: 3,
                type: 'date',
                validationSchema: Yup.date().required('Berikan tgl transaksi'),
            },
            {
                name: 'kolektorId',
                id: 'kolektorId',
                label: 'Nama Kolektor',
                gridColumn: 6,
                options: kolektor.map(({ id, name }) => ({
                    label: name,
                    value: id,
                })),
                validationSchema: Yup.string().required('Pilih kolektor'),
            },
            {
                name: 'periodMonth',
                id: 'periodeMonth',
                label: 'Bulan periode',
                gridColumn: 3,
                options: monthList.map(({ monthName, monthNumber }) => ({
                    label: monthName,
                    value: monthNumber,
                })),
                validationSchema: Yup.string().required('Pilih bulan periode'),
            },
            {
                name: 'periodYear',
                id: 'periodeYear',
                label: 'Tahun periode',
                gridColumn: 3,
                type: 'number',
                validationSchema: Yup.string().required('Pilih bulan periode'),
            },
        ];

        if (penerimaanIuranPage.type === PenerimaanIuranType.WITH_KOLEKTOR) {
            return baseDefinition;
        } else {
            delete baseDefinition[3]; // remove kolektorId input from definition

            return baseDefinition;
        }
    }, [jenisIuran, kolektor, penerimaanIuranPage.type]);

    const [formValueDefinition, setFormValueDefinition] = useState({
        iuranId: '',
        amount: '',
        transactionDate: formatDate(new Date(), dateFormat.SYSTEM),
        kolektorId:
            penerimaanIuranPage.type === PenerimaanIuranType.WITH_KOLEKTOR
                ? ''
                : undefined,
        periodMonth: '',
        periodYear: '',
    });

    const formSubmitDefinition = useMemo(
        () => ({
            label: 'Simpan data iuran',
            onSubmit: (value) => {
                confirmation.setTitle('Simpan data penerimaan iuran');
                confirmation.setMessage(
                    'Anda yakin akan menyimpan data penerimaan iuran ini?'
                );
                confirmation.setOpen(true);
                confirmation.setOnConfirmYesAction(() => () => {
                    const savingProcess = () => {
                        axios({
                            method: 'post',
                            url: '/api/penerimaan-iuran/add?add_by_kolektor=false',
                            data: {
                                ...value,
                                pendudukId: choosenPenduduk?.id,
                            },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
                            },
                        })
                            .then(() => {
                                snackbar.setOpen(true);
                                snackbar.setType('success');
                                snackbar.setMessage(
                                    'Data penerimaan iuran telah disimpan'
                                );

                                /** clear form input and choosen penduduk */
                                setChoosenPenduduk(null);
                                setFormValueDefinition({
                                    iuranId: '',
                                    amount: '',
                                    transactionDate: formatDate(
                                        new Date(),
                                        dateFormat.SYSTEM
                                    ),
                                    kolektorId:
                                        penerimaanIuranPage.type ===
                                        PenerimaanIuranType.WITH_KOLEKTOR
                                            ? ''
                                            : undefined,
                                    periodMonth: '',
                                    periodYear: '',
                                });
                                tabLayout.setActiveIndex(0);
                            })
                            .catch((error) => {
                                snackbar.setOpen(true);
                                snackbar.setType('error');
                                snackbar.setMessage(
                                    `${error.message} - ${error.response.data.message}`
                                );
                            })
                            .finally(() =>
                                /** close confirmation modal */
                                confirmation.setOpen(false)
                            );
                    };

                    if (
                        penerimaanIuranPage.type ===
                        PenerimaanIuranType.WITH_KOLEKTOR
                    ) {
                        if (isNull(choosenPenduduk)) {
                            snackbar.setOpen(true);
                            snackbar.setType('error');
                            snackbar.setMessage(
                                'Pilih penduduk yang membayar iuran'
                            );
                            confirmation.setOpen(false);
                        } else {
                            savingProcess();
                        }
                    } else {
                        savingProcess();
                    }
                });
            },
        }),
        [choosenPenduduk]
    );

    const pendudukSearchTblColDef = useMemo(() => {
        const [, ...definitions] = pendudukTblColDef;
        const newCellAction = {
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
                            setChoosenPenduduk(value.row.original);
                        }}
                    >
                        Pilih
                    </Button>
                );
            },
        };

        return [newCellAction, ...definitions];
    }, [pendudukTblColDef]);

    const pendudukSearchFormDef = useMemo(() => {
        const [address, pic, contact, email] = pendudukFormDef.map((formDef) =>
            omit(formDef, ['validationSchema'])
        );

        return [address, pic, contact, email];
    }, [pendudukFormDef]);

    const pendudukSearchSubmitDef = {
        label: 'Cari data penduduk',
        onSubmit: (value) => {
            filterPenduduk(value);
        },
    };

    return (
        <>
            <LocalTable
                columns={pendudukSearchTblColDef}
                data={pendudukTblRows}
                title="Cari dan pilih penduduk aktif"
                searchComponent={
                    <FormBuilder
                        formDefinitions={pendudukSearchFormDef}
                        valueDefinitions={{}}
                        submitDefinition={pendudukSearchSubmitDef}
                    />
                }
            />
            <br />
            <Divider>
                <Typography variant="h6" sx={{ color: '#0000007a' }}>
                    Penerimaan Iuran{' '}
                    {penerimaanIuranPage.type ===
                    PenerimaanIuranType.WITH_KOLEKTOR
                        ? 'Dengan Kolektor'
                        : 'Tanpa Kolektor'}
                </Typography>
            </Divider>
            <br />
            <PendudukCard penduduk={choosenPenduduk} />
            <br />
            <FormBuilder
                formDefinitions={formDefinition}
                valueDefinitions={formValueDefinition}
                submitDefinition={formSubmitDefinition}
            />
        </>
    );
};

PenerimaanIuranFormInput.propTypes = {
    kolektor: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
};
