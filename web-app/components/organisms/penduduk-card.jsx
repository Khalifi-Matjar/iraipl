import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';

export const PendudukCard = ({ penduduk }) => {
    return penduduk ? (
        <Accordion sx={{ width: '100%' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography variant="h6">Data Penduduk</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            label="Alamat"
                            value={penduduk?.address}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            label="Perumahan"
                            value={penduduk?.Perumahan.perumahan}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <TextField
                            disabled
                            fullWidth
                            label="Penanggung Jawab / PIC"
                            value={penduduk?.pic}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <TextField
                            disabled
                            fullWidth
                            label="Telepon / Whatsapp"
                            value={penduduk?.contact}
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    ) : (
        <Alert severity="info" sx={{ flexBasis: '50%' }}>
            Tidak ada penduduk yang dipilih
        </Alert>
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
