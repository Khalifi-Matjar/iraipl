import { Button, Chip } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { monthList } from '../../../utils/constants';
import { dateFormat, formatDate, formatMoney } from '../../../utils';
import { listData as listDataKolektor } from '../kolektor/kolektor-functions';

export const usePenerimaanIuran = () => {
    const [highlightedPenerimaan, setHighlightedPenerimaan] = useState(null);
    const penerimaanIuranTblColDef = useMemo(
        () => [
            {
                header: '',
                accessorKey: 'id',
                size: 30,
                cell: ({ row }) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={() =>
                                void setHighlightedPenerimaan(row.original)
                            }
                        >
                            Detail
                        </Button>
                    );
                },
            },
            {
                header: 'Perumahan',
                accessorKey: 'Penduduk.Perumahan.perumahan',
            },
            { header: 'Alamat', accessorKey: 'Penduduk.address' },
            { header: 'Penduduk', accessorKey: 'Penduduk.pic' },
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
            {
                header: 'Kolektor',
                accessorKey: 'Kolektor.name',
            },
        ],
        []
    );
    const [penerimaanIuranTblData, setPenerimaanIuranTblData] = useState([]);

    const [listKolektor, setListKolektor] = useState([]);

    useEffect(() => {
        // call list all kolektor
        listDataKolektor((kolektor) => {
            setListKolektor(kolektor);
        });
    }, []);

    const penerimaanIuranSearchFormDef = useMemo(
        () => [
            {
                name: 'from',
                id: 'from',
                label: 'dari',
                gridColumn: 3,
                gridColumnSmall: 6,
                type: 'date',
            },
            {
                name: 'to',
                id: 'to',
                label: 'sampai',
                gridColumn: 3,
                gridColumnSmall: 6,
                type: 'date',
            },
            {
                name: 'kolektorId',
                id: 'kolektorId',
                label: 'Kolektor',
                gridColumn: 3,
                gridColumnSmall: 12,
                options: listKolektor.map(({ id, name }) => ({
                    label: name,
                    value: id,
                })),
            },
        ],
        [listKolektor]
    );

    const [searchFormValue, setSearchFormValue] = useState({
        from: formatDate(new Date(), dateFormat.SYSTEM),
        to: formatDate(new Date(), dateFormat.SYSTEM),
    });

    const penerimaanIuranSearchFormValue = useMemo(
        () => ({
            from: searchFormValue.from,
            to: searchFormValue.to,
            kolektorId: searchFormValue.kolektorId,
        }),
        [searchFormValue]
    );

    return {
        penerimaanIuranTblColDef,
        penerimaanIuranTblData,
        setPenerimaanIuranTblData,
        highlightedPenerimaan,
        setHighlightedPenerimaan,
        penerimaanIuranSearchFormDef,
        searchFormValue,
        setSearchFormValue,
        penerimaanIuranSearchFormValue,
    };
};
