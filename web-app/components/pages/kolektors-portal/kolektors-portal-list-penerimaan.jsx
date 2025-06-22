import React, { useContext, useEffect, useMemo } from 'react';
import { LocalTable } from '../../organisms/local-table';
import { usePenerimaanIuran } from '../penerimaan-iuran/penerimaan-iuran-hooks';
import { FormBuilder } from '../../organisms/form-builder';
import { listData } from '../penerimaan-iuran/penerimaan-iuran-functions';
import { SnackbarContext } from '../../context/snackbar-context';
import {
    dateFormat,
    formatDate,
    formatMoney,
    getInitialName,
} from '../../../utils';
import {
    Avatar,
    Box,
    Chip,
    IconButton,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import PropTypes from 'prop-types';
import { monthList } from '../../../utils/constants';
import { ConfirmationContext } from '../../context/confirmation-context';
import { KolektorsPortalContext } from './kolektors-portal-page';

const StyledLink = styled('a')(() => ({
    background: 'transparent',
    border: 'unset',
    textAlign: 'left',
    width: '100%',
}));

const StyledFloatingFunctionButton = styled('div')(() => ({
    position: 'absolute',
    top: '10px',
    right: '0',
    zIndex: '2',
}));

const PenerimaanSearchItem = ({ penerimaan, onDelete }) => {
    const kolektorsPortalContext = useContext(KolektorsPortalContext);
    const confirmation = useContext(ConfirmationContext);
    const onDeleteClick = (e) => {
        e.stopPropagation();
        confirmation.setTitle('Hapus penerimaan iuran');
        confirmation.setMessage(
            'Anda yakin akan menghapus penerimaan iuran ini?'
        );
        confirmation.setOpen(true);
        confirmation.setOnConfirmYesAction(() => () => {
            onDelete(penerimaan.id);
        });
    };

    const [yearStart, monthStart] = penerimaan?.periodStart?.split('-') ?? [];
    const [yearEnd, monthEnd] = penerimaan?.periodEnd?.split('-') ?? [];
    const periodMonthStart = monthList[parseInt(monthStart) - 1]?.monthName;
    const periodMonthEnd = monthList[parseInt(monthEnd) - 1]?.monthName;

    return (
        <Box sx={{ position: 'relative' }}>
            <Stack
                spacing={2}
                direction="row"
                sx={{ alignItems: 'flex-start' }}
            >
                <Avatar>{getInitialName(penerimaan.Penduduk.pic)}</Avatar>
                <Stack>
                    <Typography variant="subtitle1">
                        {penerimaan.Penduduk.pic}
                    </Typography>
                    <Typography variant="subtitle2">
                        {penerimaan.Penduduk.address}
                    </Typography>
                    <Typography variant="body2">
                        {penerimaan.Penduduk.Perumahan.perumahan}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: '500' }}>
                        {formatMoney(penerimaan.amount)}
                        <br />
                        <Chip label={penerimaan.paymentType} />
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: '500' }}>
                        {periodMonthStart} {yearStart}-{periodMonthEnd}{' '}
                        {yearEnd}
                    </Typography>
                    <br />
                    <Chip
                        label={penerimaan.MasterIuran.iuranName}
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                    {penerimaan.PenerimaanIuranValidasi && (
                        <Chip
                            sx={{ marginTop: '10px' }}
                            label="Tervalidasi"
                            color="success"
                            size="small"
                        />
                    )}
                    <br />
                </Stack>
            </Stack>
            <StyledFloatingFunctionButton>
                <div>
                    <Chip
                        label={formatDate(penerimaan.transactionDate)}
                        color="success"
                        size="small"
                    />
                </div>
                <IconButton
                    color="warning"
                    size="large"
                    onClick={onDeleteClick}
                    disabled={penerimaan.PenerimaanIuranValidasi}
                >
                    <DeleteIcon />
                </IconButton>

                <IconButton
                    color="primary"
                    size="large"
                    onClick={() => {
                        kolektorsPortalContext.printReceipt(penerimaan.id);
                    }}
                >
                    <PrintIcon />
                </IconButton>
            </StyledFloatingFunctionButton>
        </Box>
    );
};

PenerimaanSearchItem.propTypes = {
    penerimaan: PropTypes.object,
    onDelete: PropTypes.func,
};

export const KolektorsPortalListPenerimaan = () => {
    const snackbar = useContext(SnackbarContext);
    const {
        penerimaanIuranTblData,
        setPenerimaanIuranTblData,
        penerimaanIuranSearchFormDef,
        setSearchFormValue,
        penerimaanIuranSearchFormValue,
    } = usePenerimaanIuran();

    const penerimaanIuranTblColDef = useMemo(
        () => [
            {
                header: 'Daftar penerimaan',
                accessorKey: 'id',
                cell: (value) => (
                    <StyledLink onClick={() => {}}>
                        <PenerimaanSearchItem penerimaan={value.row.original} />
                    </StyledLink>
                ),
            },
        ],
        []
    );

    const penerimaanIuranSearchSubmitDef = useMemo(
        () => ({
            label: 'Cari data penerimaan iuran',
            onSubmit: (value) => {
                setSearchFormValue(value);
                listPenerimaanIuranData(value);
            },
        }),
        []
    );

    const listPenerimaanIuranData = ({ from, to }) => {
        listData({
            range: JSON.stringify({
                from,
                to,
            }),
            withKolektor: true,
            isMyCollective: true,
        })
            .then((response) => {
                setPenerimaanIuranTblData(response.data.penerimaanIuran);
            })
            .catch((error) => {
                snackbar.setOpen(true);
                snackbar.setType('error');
                snackbar.setMessage(
                    `${error.message} - ${error.response.data.message}`
                );
            });
    };

    useEffect(() => {
        listPenerimaanIuranData({
            from: formatDate(new Date(), dateFormat.SYSTEM),
            to: formatDate(new Date(), dateFormat.SYSTEM),
        });
    }, []);

    return (
        <>
            <LocalTable
                columns={penerimaanIuranTblColDef}
                data={penerimaanIuranTblData}
                title="Daftar Penerimaan Iuran"
                searchComponent={
                    <FormBuilder
                        formDefinitions={penerimaanIuranSearchFormDef}
                        valueDefinitions={penerimaanIuranSearchFormValue}
                        submitDefinition={penerimaanIuranSearchSubmitDef}
                    />
                }
            />
        </>
    );
};
