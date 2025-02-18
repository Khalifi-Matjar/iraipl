import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import noop from 'lodash/noop';
import { ConfirmationModal } from '../organisms/confirmation-modal';

export const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [onConfirmYesAction, setOnConfirmYesAction] = useState(() => noop);
    const [onConfirmNoAction, setOnConfirmNoAction] = useState(() => noop);

    return (
        <ConfirmationContext.Provider
            value={{
                setOpen,
                setTitle,
                setMessage,
                setOnConfirmYesAction,
                setOnConfirmNoAction,
            }}
        >
            {children}
            <ConfirmationModal
                open={open}
                title={title}
                message={message}
                onConfirmYesAction={onConfirmYesAction}
                onConfirmNoAction={() => {
                    setOpen(false);
                    onConfirmNoAction();
                }}
            />
        </ConfirmationContext.Provider>
    );
};

ConfirmationProvider.propTypes = {
    children: PropTypes.node,
};
