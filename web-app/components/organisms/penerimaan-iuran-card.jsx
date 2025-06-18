import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Button,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import { formatDate, formatMoney } from '../../utils';
import { monthList } from '../../utils/constants';
import { PendudukCard } from './penduduk-card';

export const PenerimaanIuranCard = ({
    penerimaanIuran,
    hasDeleteButton = false,
    hasValidateButton = false,
    onDelete = noop,
    onValidateAccept = noop,
}) => {
    const [yearStart, monthStart] =
        penerimaanIuran?.periodStart?.split('-') ?? [];
    const [yearEnd, monthEnd] = penerimaanIuran?.periodEnd?.split('-') ?? [];
    const periodMonthStart = monthList[parseInt(monthStart) - 1]?.monthName;
    const periodMonthEnd = monthList[parseInt(monthEnd) - 1]?.monthName;

    return penerimaanIuran ? (
        <>
            <PendudukCard penduduk={penerimaanIuran.Penduduk} />
            <Accordion sx={{ width: '100%' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography variant="h6">Data Penerimaan Iuran</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                disabled
                                fullWidth
                                label="Nama Iuran"
                                value={
                                    penerimaanIuran?.MasterIuran?.iuranName ??
                                    '-'
                                }
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                disabled
                                fullWidth
                                label="Kolektor"
                                value={penerimaanIuran?.Kolektor?.name ?? '-'}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                disabled
                                fullWidth
                                label="Tgl. Transaksi"
                                value={formatDate(
                                    penerimaanIuran?.transactionDate
                                )}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                disabled
                                fullWidth
                                label="Bayar untuk"
                                value={`${periodMonthStart} ${yearStart} S/D ${periodMonthEnd} ${yearEnd}`}
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
                        <Grid item xs={3}>
                            <TextField
                                disabled
                                fullWidth
                                label="Metode pembayaran"
                                value={penerimaanIuran.paymentType}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                label="Keterangan"
                                value={penerimaanIuran.summary}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <AccordionActions>
                    {hasDeleteButton && (
                        <Button
                            size="small"
                            variant="outlined"
                            color="warning"
                            onClick={() => void onDelete(penerimaanIuran.id)}
                        >
                            Hapus
                        </Button>
                    )}
                    {hasValidateButton && (
                        <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            onClick={() =>
                                void onValidateAccept(penerimaanIuran.id)
                            }
                        >
                            Validasi Terima
                        </Button>
                    )}
                </AccordionActions>
            </Accordion>
        </>
    ) : (
        <Alert severity="info" sx={{ width: '100%' }}>
            Tidak ada data penerimaan iuran yang dipilih
        </Alert>
    );
};

PenerimaanIuranCard.propTypes = {
    penerimaanIuran: PropTypes.object,
    hasDeleteButton: PropTypes.bool,
    hasValidateButton: PropTypes.bool,
    onDelete: PropTypes.func,
    onValidateAccept: PropTypes.func,
};
