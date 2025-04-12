import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import { FormBuilder } from '../../organisms/form-builder';

export const UsersFormDialog = ({
    isOpen,
    id,
    formDef,
    formValue,
    onClose,
    onSubmit,
}) => {
    return (
        <Dialog open={isOpen} fullWidth maxWidth="md">
            <DialogTitle>
                {isNull(id) ? 'Tambah' : 'Ubah'} Pengguna non kolektor
            </DialogTitle>
            <IconButton
                aria-label="close"
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <FormBuilder
                    formDefinitions={formDef}
                    valueDefinitions={formValue}
                    submitDefinition={{
                        label: 'Simpan',
                        onSubmit,
                    }}
                />
                {!isNull(id) && (
                    <>
                        <br />
                        <Typography variant="button">
                            Kosongkan password jika tidak ingin berubah
                        </Typography>
                    </>
                )}
            </DialogContent>
            {!isNull(id) && (
                <DialogActions>
                    <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        color="warning"
                        onClick={() => {}}
                    >
                        Hapus pengguna
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

UsersFormDialog.propTypes = {
    isOpen: PropTypes.bool,
    id: PropTypes.string,
    formDef: PropTypes.array,
    formValue: PropTypes.object,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};
