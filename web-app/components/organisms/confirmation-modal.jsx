import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

export const ConfirmationModal = ({ open, title, message, onConfirmYesAction, onConfirmNoAction = () => {} }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onConfirmNoAction}>
                    No
                </Button>
                <Button variant="contained" onClick={onConfirmYesAction}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationModal.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    onConfirmYesAction: PropTypes.func,
    onConfirmNoAction: PropTypes.func,
};
