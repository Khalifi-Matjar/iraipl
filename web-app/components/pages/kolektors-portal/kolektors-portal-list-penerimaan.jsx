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
import PropTypes from 'prop-types';
import { monthList } from '../../../utils/constants';
import { ConfirmationContext } from '../../context/confirmation-context';

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

    return (
        <Box sx={{ position: 'relative' }}>
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
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
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: '500' }}>
                        Periode:{' '}
                        {monthList[penerimaan.periodMonth - 1].monthName}{' '}
                        {penerimaan.periodYear}
                    </Typography>
                    <br />
                    <Chip
                        label={penerimaan.MasterIuran.iuranName}
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                    <br />
                </Stack>
            </Stack>
            <StyledFloatingFunctionButton>
                <IconButton
                    color="warning"
                    size="large"
                    onClick={onDeleteClick}
                >
                    <DeleteIcon />
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
        // penerimaanIuranTblColDef,
        penerimaanIuranTblData,
        setPenerimaanIuranTblData,
        // highlightedPenerimaan,
        // setHighlightedPenerimaan,
        penerimaanIuranSearchFormDef,
        setSearchFormValue,
        // searchFormValue,
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
