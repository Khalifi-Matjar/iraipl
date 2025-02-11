import React, { useMemo } from 'react';
import * as Yup from 'yup';
import omit from 'lodash/omit';
import { FormBuilder } from '../../organisms/form-builder';
import { dateFormat, formatDate } from '../../../utils';
import PropTypes from 'prop-types';
import { usePenduduk } from '../penduduk/penduduk-hooks';
import { LocalTable } from '../../organisms/local-table';
import { Divider, Typography } from '@mui/material';

export const PenerimaanIuranFormInput = ({ iuran, kolektor }) => {
    const { pendudukTblColDef, pendudukTblRows, pendudukFormDef } =
        usePenduduk();
    const formDefinition = useMemo(
        () => [
            {
                name: 'iuranName',
                id: 'iuranName',
                label: 'Nama Iuran',
                gridColumn: 6,
                options: iuran.map(({ id, iuranName }) => ({
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
                name: 'periodeMonth',
                id: 'periodeMonth',
                label: 'Bulan periode',
                gridColumn: 3,
                options: [],
                validationSchema: Yup.string().required('Pilih bulan periode'),
            },
            {
                name: 'periodeYear',
                id: 'periodeYear',
                label: 'Tahun periode',
                gridColumn: 3,
                type: 'number',
                validationSchema: Yup.string().required('Pilih bulan periode'),
            },
        ],
        [iuran, kolektor]
    );

    const formValueDefinition = {
        transactionDate: formatDate(new Date(), dateFormat.SYSTEM),
    };

    const formSubmitDefinition = {
        label: 'Simpan data iuran',
        onSubmit: (value) => {
            console.log('simpan data iuran', value);
        },
    };

    const pendudukSearchFormDef = useMemo(() => {
        const [address, pic, contact, email] = pendudukFormDef.map((formDef) =>
            omit(formDef, ['validationSchema'])
        );

        return [address, pic, contact, email];
    }, [pendudukFormDef]);

    const pendudukSearchSubmitDef = {
        label: 'Cari data penduduk',
        onSubmit: (value) => {
            console.log('cari data penduduk', value);
        },
    };

    return (
        <>
            <LocalTable
                columns={pendudukTblColDef}
                data={pendudukTblRows}
                title="Cari dan pilih penduduk"
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
                {/* <Chip label="Penerimaan iuran" size="small" /> */}
                <Typography variant="h6" sx={{ color: '#0000007a' }}>
                    Penerimaan Iuran
                </Typography>
            </Divider>
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
    iuran: PropTypes.array,
    kolektor: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
};
