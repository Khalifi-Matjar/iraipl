import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { FormBuilder } from '../../organisms/form-builder';
import { dateFormat, formatDate, formatMoney } from '../../../utils';
import { LocalTable } from '../../organisms/local-table';
import { Chip } from '@mui/material';
import { monthList } from '../../../utils/constants';
import { historyPenerimaan } from '../penerimaan-iuran/penerimaan-iuran-functions';

export const PendudukHistoryPayment = ({ penduduk, jenisIuran }) => {
    const [penerimaanIuranData, setPenerimaanIuranData] = useState([]);
    const penerimaanIuranTblColDef = useMemo(
        () => [
            { header: 'Iuran', accessorKey: 'MasterIuran.iuranName' },
            {
                header: 'Tgl. Transaksi',
                accessorKey: 'transactionDate',
                cell: ({ row }) => formatDate(row.original.transactionDate),
            },
            {
                header: 'Jumlah',
                accessorKey: 'amount',
                cell: ({ row }) => (
                    <>
                        {formatMoney(row.original.amount)}
                        <br />
                        <Chip label={row.original.paymentType} />
                    </>
                ),
                align: 'right',
            },
            {
                header: 'Bayar untuk',
                accessorKey: 'periodStart',
                cell: ({ row }) => {
                    const [yearStart, monthStart] =
                        row.original.periodStart.split('-');
                    const [yearEnd, monthEnd] =
                        row.original.periodEnd.split('-');
                    const periodMonthStart =
                        monthList[parseInt(monthStart) - 1].monthName;
                    const periodMonthEnd =
                        monthList[parseInt(monthEnd) - 1].monthName;

                    return (
                        <>
                            {periodMonthStart} {yearStart}
                            <br />
                            S/D
                            <br />
                            {periodMonthEnd} {yearEnd}
                        </>
                    );
                },
            },
        ],
        []
    );
    const searchFormDef = useMemo(
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
        ],
        [penduduk, jenisIuran]
    );
    const [searchFormValue] = useState({
        from: formatDate(new Date(), dateFormat.SYSTEM),
        to: formatDate(new Date(), dateFormat.SYSTEM),
    });

    return (
        <LocalTable
            columns={penerimaanIuranTblColDef}
            data={penerimaanIuranData}
            title={`${penduduk.Perumahan.perumahan} | ${penduduk.address} | ${penduduk.pic}`}
            searchComponent={
                <FormBuilder
                    formDefinitions={searchFormDef}
                    valueDefinitions={searchFormValue}
                    submitDefinition={{
                        label: 'View',
                        onSubmit: ({ iuranId }) => {
                            historyPenerimaan({
                                iuranId,
                                pendudukId: penduduk.id,
                            }).then(({ data }) => {
                                setPenerimaanIuranData(data.penerimaanIuran);
                            });
                        },
                    }}
                />
            }
        />
    );
};

PendudukHistoryPayment.propTypes = {
    penduduk: PropTypes.object,
    jenisIuran: PropTypes.array,
};
