import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import { formatDate, formatMoney } from '../../utils';
import { monthList } from '../../utils/constants';
import { PendudukCard } from './penduduk-card';

const StyledDiv = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
}));

const StyledCard = styled(Card)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const PenerimaanIuranCard = ({
    penerimaanIuran,
    hasDeleteButton = false,
    hasValidateButton = false,
    onDelete = noop,
}) => {
    const periodMonth = !penerimaanIuran
        ? ''
        : monthList[penerimaanIuran.periodMonth - 1].monthName;
    const periodYear = !penerimaanIuran ? '' : penerimaanIuran.periodYear;

    return penerimaanIuran ? (
        <StyledDiv>
            <PendudukCard penduduk={penerimaanIuran.Penduduk} />
            <StyledCard variant="outlined">
                <CardContent>
                    <Typography variant="h6">Data Penerimaan Iuran</Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                disabled
                                fullWidth
                                label="Nama Iuran"
                                value={penerimaanIuran.MasterIuran.iuranName}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                disabled
                                fullWidth
                                label="Kolektor"
                                value={penerimaanIuran.Kolektor.name}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                disabled
                                fullWidth
                                label="Tgl. Transaksi"
                                value={formatDate(
                                    penerimaanIuran.transactionDate
                                )}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                fullWidth
                                label="Periode"
                                value={`${periodMonth} ${periodYear}`}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                disabled
                                fullWidth
                                label="Jumlah"
                                value={formatMoney(penerimaanIuran.amount)}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    {hasDeleteButton && (
                        <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() => void onDelete(penerimaanIuran.id)}
                        >
                            Hapus
                        </Button>
                    )}
                    {hasValidateButton && (
                        <>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                            >
                                Validasi Terima
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="error"
                            >
                                Validasi Tolak
                            </Button>
                        </>
                    )}
                </CardActions>
            </StyledCard>
        </StyledDiv>
    ) : (
        <Alert severity="info">
            Tidak ada data penerimaan iuran yang dipilih
        </Alert>
    );
};

PenerimaanIuranCard.propTypes = {
    penerimaanIuran: PropTypes.object,
    hasDeleteButton: PropTypes.bool,
    hasValidateButton: PropTypes.bool,
    onDelete: PropTypes.func,
};
