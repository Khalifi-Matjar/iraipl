import {
    Alert,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export const PendudukCard = ({ penduduk }) => {
    return penduduk ? (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Data Penduduk</Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            label="Alamat"
                            value={penduduk.address}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            label="Perumahan"
                            value={penduduk.Perumahan.perumahan}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            disabled
                            fullWidth
                            label="Penanggung Jawab / PIC"
                            value={penduduk.pic}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            disabled
                            fullWidth
                            label="Telepon / Whatsapp"
                            value={penduduk.contact}
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    ) : (
        <Alert severity="info">Tidak ada penduduk yang dipilih</Alert>
    );
};

PendudukCard.propTypes = {
    penduduk: PropTypes.shape({
        id: PropTypes.string,
        address: PropTypes.string,
        perumahanId: PropTypes.string,
        pic: PropTypes.string,
        contact: PropTypes.string,
        email: PropTypes.string,
        isActive: PropTypes.number,
        NilaiIuranPenduduks: PropTypes.array,
        Perumahan: PropTypes.shape({
            id: PropTypes.string,
            perumahan: PropTypes.string,
        }),
    }),
};
