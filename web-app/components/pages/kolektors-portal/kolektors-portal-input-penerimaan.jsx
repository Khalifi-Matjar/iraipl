import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';

import { PendudukCard } from '../../organisms/penduduk-card';
import { FormBuilder } from '../../organisms/form-builder';
import { monthList } from '../../../utils/constants';
import { dateFormat, formatDate } from '../../../utils';
import { Button, Divider, Typography } from '@mui/material';
import { KolektorsPortalSearchPendudukDrawer } from './kolektors-portal-search-penduduk-drawer';

export const KolektorsPortalInputPenerimaan = () => {
    const [choosenPenduduk] = useState(null);

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

    const [formValueDefinition] = useState({
        iuranId: '',
        amount: '',
        transactionDate: formatDate(new Date(), dateFormat.SYSTEM),
        kolektorId: '',
        periodMonth: '',
        periodYear: '',
    });

    const formSubmitDefinition = {
        label: 'Simpan penerimaan iuran',
        isFullWidthButton: true,
        onSubmit: (value) => {
            console.log('submit', value);
        },
    };

    return (
        <>
            <KolektorsPortalSearchPendudukDrawer
                openSearch={openSearch}
                setOpenSearch={setOpenSearch}
                setJenisIuran={setJenisIuran}
            />
            <Button
                color="primary"
                variant="contained"
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
            <FormBuilder
                formDefinitions={formDefinition}
                valueDefinitions={formValueDefinition}
                submitDefinition={formSubmitDefinition}
            />
        </>
    );
};
