import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    styled,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const StyledPaper = styled(Paper)(() => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
}));

const StyledBox = styled(Box)(() => ({
    padding: '20px 20px 0',
    maxHeight: 'calc(100dvh - 60)',
}));

export default function BottomNavLayout({ childElements = [] }) {
    const [activeNavIndex, setActiveNavIndex] = useState(0);

    const renderedChildren = useMemo(
        () => childElements[activeNavIndex]?.children,
        [activeNavIndex]
    );

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
