import React, { useContext, useMemo, useState } from 'react';
import isNull from 'lodash/isNull';
import axios from 'axios';
import * as Yup from 'yup';

import { PendudukCard } from '../../organisms/penduduk-card';
import { FormBuilder } from '../../organisms/form-builder';
import { LOCAL_STORAGE_TOKEN_KEY, monthList } from '../../../utils/constants';
import {
    closeConfirmationModalObject,
    dateFormat,
    formatDate,
} from '../../../utils';
import { Button, Divider, Typography } from '@mui/material';
import { KolektorsPortalSearchPendudukDrawer } from './kolektors-portal-search-penduduk-drawer';
import { SnackbarContext } from '../../context/snackbar-context';
import { ConfirmationModal } from '../../organisms/confirmation-modal';

export const KolektorsPortalInputPenerimaan = () => {
    const [confirmModalProps, setConfirmModalProps] = useState(
        closeConfirmationModalObject
    );

    const snackbar = useContext(SnackbarContext);

    const [choosenPenduduk, setChoosenPenduduk] = useState(null);

    const [openSearch, setOpenSearch] = useState(false);

    const [jenisIuran, setJenisIuran] = useState([]);

    const formDefinition = useMemo(
        () => [
            {
                name: 'iuranId',
                id: 'iuranId',
                label: 'Nama Iuran',
                gridColumn: 6,
                options: jenisIuran.map(({ id, iuranName }) => ({
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
                name: 'periodMonth',
                id: 'periodeMonth',
                label: 'Bulan periode',
                gridColumn: 3,
                gridColumnSmall: 6,
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
                gridColumnSmall: 6,
                type: 'number',
                validationSchema: Yup.string().required('Pilih bulan periode'),
            },
        ],
        [jenisIuran]
    );

    const [formValueDefinition, setFormValueDefinition] = useState({
        iuranId: '',
        amount: '',
        transactionDate: formatDate(new Date(), dateFormat.SYSTEM),
        periodMonth: '',
        periodYear: '',
    });

    const formSubmitDefinition = {
        label: 'Simpan penerimaan iuran',
        isFullWidthButton: true,
        onSubmit: (value) => {
            setConfirmModalProps({
                open: true,
                title: 'Simpan data penerimaan iuran',
                message: 'Anda yakin akan menyimpan data penerimaan iuran ini?',
                onConfirmYesAction: () => {
                    if (isNull(choosenPenduduk)) {
                        snackbar.setOpen(true);
                        snackbar.setType('error');
                        snackbar.setMessage(
                            'Pilih penduduk yang membayar iuran'
                        );
                        setConfirmModalProps(closeConfirmationModalObject);
                    } else {
                        axios({
                            method: 'post',
                            url: '/api/penerimaan-iuran/add?add_by_kolektor=true',
                            data: {
                                ...value,
                                pendudukId: choosenPenduduk.id,
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
                                    periodMonth: '',
                                    periodYear: '',
                                });
                            })
                            .catch((error) => {
                                snackbar.setOpen(true);
                                snackbar.setType('error');
                                snackbar.setMessage(
                                    `${error.message} - ${error.response.data.message}`
                                );
                            })
                            .finally(
                                () =>
                                    /** close confirmation modal */
                                    void setConfirmModalProps(
                                        closeConfirmationModalObject
                                    )
                            );
                    }
                },
                onConfirmNoAction: () =>
                    void setConfirmModalProps(closeConfirmationModalObject),
            });
        },
    };

    return (
        <>
            <KolektorsPortalSearchPendudukDrawer
                openSearch={openSearch}
                setOpenSearch={setOpenSearch}
                setJenisIuran={setJenisIuran}
                onPendudukClick={setChoosenPenduduk}
            />
            <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={() => setOpenSearch(true)}
            >
                Pilih penduduk
            </Button>
            <br />
            <br />
            <Divider>
                <Typography variant="subtitle1" sx={{ color: '#0000007a' }}>
                    Penerimaan Iuran
                </Typography>
            </Divider>
            <br />
            <PendudukCard penduduk={choosenPenduduk} />
            <br />
            <div style={{ padding: '0 5px 0' }}>
                <FormBuilder
                    formDefinitions={formDefinition}
                    valueDefinitions={formValueDefinition}
                    submitDefinition={formSubmitDefinition}
                />
            </div>
            <ConfirmationModal {...confirmModalProps} />
        </>
    );
};
