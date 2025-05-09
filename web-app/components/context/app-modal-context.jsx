import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const AppModalContext = createContext();

export const AppModalProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [childComponent, setChildComponent] = useState(null);

    return (
        <AppModalContext.Provider
            value={{
                setIsOpen,
                setTitle,
                setChildComponent,
            }}
        >
            {children}
            <Dialog open={isOpen} fullWidth maxWidth="md">
                <DialogTitle>{title}</DialogTitle>
                <IconButton
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={() => void setIsOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>{childComponent}</DialogContent>
            </Dialog>
        </AppModalContext.Provider>
    );
};

AppModalProvider.propTypes = {
    children: PropTypes.node,
};
