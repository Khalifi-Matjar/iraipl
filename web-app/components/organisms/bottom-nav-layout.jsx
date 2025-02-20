import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    styled,
} from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { ConfirmationContext } from '../context/confirmation-context';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../utils';

const StyledPaper = styled(Paper)(() => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
}));

const StyledBox = styled(Box)(() => ({
    padding: '0',
    maxHeight: 'calc(100dvh - 100px)',
    overflowY: 'auto',
}));

export default function BottomNavLayout({ childElements = [] }) {
    const confirmation = useContext(ConfirmationContext);
    const [activeNavIndex, setActiveNavIndex] = useState(0);

    const renderedChildren = useMemo(
        () => childElements[activeNavIndex]?.children,
        [activeNavIndex]
    );

    useEffect(() => {
        if (activeNavIndex === childElements.length - 1) {
            confirmation.setTitle('Logout');
            confirmation.setMessage('Anda yakin akan logout?');
            confirmation.setOpen(true);
            confirmation.setOnConfirmYesAction(() => () => {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                location.href = '/';
            });
        }
    }, [activeNavIndex, childElements]);

    return (
        <StyledBox>
            {renderedChildren}
            <StyledPaper elevation={3}>
                <BottomNavigation
                    showLabels
                    value={activeNavIndex}
                    onChange={(_event, newValue) => {
                        setActiveNavIndex(newValue);
                    }}
                >
                    {childElements.map(({ menuLabel, menuIcon }) => (
                        <BottomNavigationAction
                            key={`bottom-menu-${menuLabel}`}
                            label={menuLabel}
                            icon={menuIcon}
                        />
                    ))}
                </BottomNavigation>
            </StyledPaper>
        </StyledBox>
    );
}

BottomNavLayout.propTypes = {
    childElements: PropTypes.arrayOf(
        PropTypes.exact({
            menuLabel: PropTypes.string,
            menuIcon: PropTypes.node,
            children: PropTypes.node,
        })
    ),
};
