import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { formatDate, formatMoney } from '../../utils';
import { monthList } from '../../utils/constants';
import { PendudukCard } from './penduduk-card';
import { findUserDetails } from '../pages/users/users-functions';

export const PenerimaanIuranCard = ({
    penerimaanIuran,
    hasDeleteButton = false,
    hasValidateButton = false,
    hasRejectButton = false,
    hasPrintButton = false,
    onDelete = noop,
    onValidateAccept = noop,
    onValidateReject = noop,
}) => {
    const [yearStart, monthStart] =
        penerimaanIuran?.periodStart?.split('-') ?? [];
    const [yearEnd, monthEnd] = penerimaanIuran?.periodEnd?.split('-') ?? [];
    const periodMonthStart = monthList[parseInt(monthStart) - 1]?.monthName;
    const periodMonthEnd = monthList[parseInt(monthEnd) - 1]?.monthName;
    const [rejectionReason, setRejectionReason] = React.useState('');
    const [openPrint, setOpenPrint] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const RECEIPT_URL = `${location.origin}/report/penerimaan-iuran/receipt`;

    const StyledIframe = styled('iframe')(() => ({
        width: '100%',
        height: '350px',
        border: 'solid 1px #ccc',
    }));

    useEffect(() => {
        findUserDetails()
            .then((userDetails) => {
                setUserDetails(userDetails.data.findUser);
            })
            .catch((error) =>
                console.error('Error fetching user details:', error)
            );
    }, []);

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
                {hasRejectButton && (
                    <>
                        <hr />
                        <Grid container spacing={2} sx={{ padding: '20px' }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Khusus untuk menolak penerimaan iuran ini, harap berikan alasan penolakan. Tombol Validasi Tolak akan aktif setelah alasan penolakan diisi."
                                    value={rejectionReason}
                                    onChange={(e) =>
                                        setRejectionReason(e.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
                <AccordionActions>
                    {hasDeleteButton && (
                        <Button
                            size="small"
                            variant="outlined"
                            color="warning"
                            onClick={() => void onDelete(penerimaanIuran.id)}
                            disabled={
                                penerimaanIuran?.PenerimaanIuranValidasi &&
                                userDetails.roleUserId !== 1
                            }
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
                    {hasRejectButton && (
                        <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() =>
                                void onValidateReject({
                                    penerimaanId: penerimaanIuran.id,
                                    rejectionReason,
                                })
                            }
                            disabled={rejectionReason.trim() === ''}
                        >
                            Validasi Tolak
                        </Button>
                    )}
                    {hasPrintButton && (
                        <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() => {
                                setOpenPrint(true);
                            }}
                        >
                            Cetak Struk
                        </Button>
                    )}
                </AccordionActions>
            </Accordion>

            {/* Printing penerimaan iuran receipt */}
            <Dialog open={openPrint} disablePortal={true}>
                <DialogTitle>Print struk penerimaan</DialogTitle>
                <DialogContent>
                    <StyledIframe
                        src={`${RECEIPT_URL}?id=${penerimaanIuran.id}`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpenPrint(false);
                        }}
                    >
                        Tutup
                    </Button>
                </DialogActions>
            </Dialog>
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
    hasRejectButton: PropTypes.bool,
    hasPrintButton: PropTypes.bool,
    onDelete: PropTypes.func,
    onValidateAccept: PropTypes.func,
    onValidateReject: PropTypes.func,
};
