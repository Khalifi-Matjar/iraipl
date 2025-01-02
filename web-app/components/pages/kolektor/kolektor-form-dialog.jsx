import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import noop from 'lodash/noop';
import { FormBuilder } from '../../organisms/form-builder';
import { ConfirmationModal } from '../../organisms/confirmation-modal';

export const KolektorFormDialog = ({ isOpen, formDef, formValue, onSubmit, onDelete, onClose, id, updatePasswordFormDef, onResetPassword }) => {
    const [confirmModalProps, setConfirmModalProps] = useState({
        open: false,
        title: '',
        message: '',
        onConfirmYesAction: noop,
        onConfirmNoAction: noop,
    });

    return (
        <>
            <Dialog open={isOpen} fullWidth maxWidth="md">
                <DialogTitle>{isNull(id) ? 'Tambah' : 'Ubah'} Data Kolektor</DialogTitle>
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
                    {!isNull(id) && (
                        <>
                            <DialogContentText>
                                Jika kolektor sudah terdaftar pada data user, maka tindakan ini akan ikut mengubah email yang digunakan untuk <i>Login</i> kedalam aplikasi
                            </DialogContentText>
                            <br />
                        </>
                    )}
                    <FormBuilder
                        formDefinitions={formDef}
                        valueDefinitions={formValue}
                        submitDefinition={{
                            label: 'Simpan',
                            onSubmit: (value) => {
                                setConfirmModalProps({
                                    open: true,
                                    title: 'Data kolektor',
                                    message: 'Anda yakin akan menyimpan data kolektor ini',
                                    onConfirmYesAction: () => {
                                        onSubmit(value);
                                        setConfirmModalProps({
                                            open: false,
                                            title: '',
                                            message: '',
                                            onConfirmYesAction: noop,
                                            onConfirmNoAction: noop,
                                        });
                                    },
                                    onConfirmNoAction: () =>
                                        void setConfirmModalProps({
                                            open: false,
                                            title: '',
                                            message: '',
                                            onConfirmYesAction: noop,
                                            onConfirmNoAction: noop,
                                        }),
                                });
                            },
                        }}
                    />
                </DialogContent>
                {!isNull(id) && (
                    <>
                        <DialogTitle>Atur Password Untuk Pengguna Kolektor</DialogTitle>
                        <DialogContent dividers>
                            <DialogContentText>
                                Jika kolektor sudah terdaftar pada data user, maka tindakan ini akan mengubah password yang ada, tetapi jika belum terdaftar, maka tindakan ini akan membuat data user
                                untuk kolektor yang bersangkutan.
                            </DialogContentText>
                            <br />
                            <FormBuilder
                                formDefinitions={updatePasswordFormDef}
                                valueDefinitions={{}}
                                submitDefinition={{
                                    label: 'Reset PAssword',
                                    onSubmit: (value) => {
                                        setConfirmModalProps({
                                            open: true,
                                            title: 'Reset Password kolektor',
                                            message: 'Anda yakin akan me-reset password kolektor ini',
                                            onConfirmYesAction: () => {
                                                onResetPassword(value);
                                                setConfirmModalProps({
                                                    open: false,
                                                    title: '',
                                                    message: '',
                                                    onConfirmYesAction: noop,
                                                    onConfirmNoAction: noop,
                                                });
                                            },
                                            onConfirmNoAction: () =>
                                                void setConfirmModalProps({
                                                    open: false,
                                                    title: '',
                                                    message: '',
                                                    onConfirmYesAction: noop,
                                                    onConfirmNoAction: noop,
                                                }),
                                        });
                                    },
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                fullWidth
                                variant="contained"
                                size="small"
                                color="warning"
                                onClick={() => {
                                    setConfirmModalProps({
                                        open: true,
                                        title: 'Hapus Data kolektor',
                                        message: 'Anda yakin akan menghapus data kolektor ini',
                                        onConfirmYesAction: () => {
                                            onDelete();
                                            setConfirmModalProps({
                                                open: false,
                                                title: '',
                                                message: '',
                                                onConfirmYesAction: noop,
                                                onConfirmNoAction: noop,
                                            });
                                        },
                                        onConfirmNoAction: () =>
                                            void setConfirmModalProps({
                                                open: false,
                                                title: '',
                                                message: '',
                                                onConfirmYesAction: noop,
                                                onConfirmNoAction: noop,
                                            }),
                                    });
                                }}
                            >
                                Hapus data kolektor
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
            <ConfirmationModal {...confirmModalProps} />
        </>
    );
};

KolektorFormDialog.propTypes = {
    isOpen: PropTypes.bool,
    formDef: PropTypes.arrayOf(PropTypes.object),
    formValue: PropTypes.object,
    id: PropTypes.string,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,

    // Kolektor user management purpose
    updatePasswordFormDef: PropTypes.arrayOf(PropTypes.object),
    onResetPassword: PropTypes.func,
};
