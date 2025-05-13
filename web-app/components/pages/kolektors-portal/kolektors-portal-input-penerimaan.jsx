import React, { useContext, useEffect, useMemo, useState } from 'react';
import isNull from 'lodash/isNull';
import axios from 'axios';
import * as Yup from 'yup';

import { PendudukCard } from '../../organisms/penduduk-card';
import { FormBuilder } from '../../organisms/form-builder';
import { LOCAL_STORAGE_TOKEN_KEY, paymentType } from '../../../utils/constants';
import {
    closeConfirmationModalObject,
    dateFormat,
    formatDate,
} from '../../../utils';
import { Button, Divider, Typography } from '@mui/material';
import { KolektorsPortalSearchPendudukDrawer } from './kolektors-portal-search-penduduk-drawer';
import { SnackbarContext } from '../../context/snackbar-context';
import { ConfirmationModal } from '../../organisms/confirmation-modal';
import { KolektorsPortalContext } from './kolektors-portal-page';
import { autoAmount } from '../penerimaan-iuran/penerimaan-iuran-functions';

export const KolektorsPortalInputPenerimaan = () => {
    const [confirmModalProps, setConfirmModalProps] = useState(
        closeConfirmationModalObject
    );

    const snackbar = useContext(SnackbarContext);

    const [choosenPenduduk, setChoosenPenduduk] = useState(null);

    const [openSearch, setOpenSearch] = useState(false);

    const [jenisIuran, setJenisIuran] = useState([]);

    const [formikInstance, setFormikInstance] = useState(null);

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
                name: 'periodStart',
                id: 'periodStart',
                label: 'Periode awal',
                gridColumn: 3,
                type: 'month',
                validationSchema: Yup.string().required('Pilih periode awal'),
            },
            {
                name: 'periodEnd',
                id: 'periodEnd',
                label: 'Periode akhir',
                gridColumn: 3,
                type: 'month',
                validationSchema: Yup.string().required('Pilih periode akhir'),
            },
            {
                name: 'paymentType',
                id: 'paymentType',
                label: 'Tipe pembayaran',
                gridColumn: 4,
                options: paymentType.map((paymentType) => ({
                    label: paymentType,
                    value: paymentType,
                })),
                optionsFieldType: 'radio',
                validationSchema: Yup.string().required(
                    'Pilih tipe pembayaran'
                ),
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

    useEffect(() => {
        if (
            choosenPenduduk &&
            formikInstance?.values?.iuranId &&
            formikInstance?.values?.periodStart &&
            formikInstance?.values?.periodEnd
        ) {
            autoAmount({
                pendudukId: choosenPenduduk.id,
                iuranId: formikInstance?.values?.iuranId,
                periodStart: formikInstance?.values?.periodStart,
                periodEnd: formikInstance?.values?.periodEnd,
            }).then(({ data }) => {
                formikInstance.setFieldValue('amount', data.amount);
            });
        }
    }, [
        choosenPenduduk,
        formikInstance?.values?.iuranId,
        formikInstance?.values?.periodStart,
        formikInstance?.values?.periodEnd,
    ]);

    const kolektorsPortalContext = useContext(KolektorsPortalContext);

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
                            .then((response) => {
                                snackbar.setOpen(true);
                                snackbar.setType('success');
                                snackbar.setMessage(
                                    'Data penerimaan iuran telah disimpan'
                                );

                                kolektorsPortalContext.printReceipt(
                                    response.data.metadata.penerimaan.id
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
                    passFormik={(formik) => {
                        setFormikInstance(formik);
                    }}
                />
            </div>
            <ConfirmationModal {...confirmModalProps} />
        </>
    );
};
