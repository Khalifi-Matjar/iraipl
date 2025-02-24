import { Box, styled } from '@mui/material';
import React from 'react';
import { Sidebar } from '../layout';
import PropTypes from 'prop-types';

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-start',
    overflowX: 'hidden',
}));
const StyledMain = styled(Box)(() => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '20px',
}));

export const MasterPage = ({ children }) => {
    return (
        <StyledBox>
            <Sidebar />
            <StyledMain>
                {/* show the content with header */}
                {children}
            </StyledMain>
        </StyledBox>
    );
};

MasterPage.propTypes = {
    children: PropTypes.node,
};
