import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';

export const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <SpinnerContext.Provider value={{ setOpen }}>
            <Backdrop
                sx={(theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </SpinnerContext.Provider>
    );
};

SpinnerProvider.propTypes = {
    children: PropTypes.node,
};
