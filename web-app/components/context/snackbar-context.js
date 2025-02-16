import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ setOpen, setMessage, setType }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={type} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

SnackbarProvider.propTypes = {
    children: PropTypes.node,
};
