import { Box, styled } from '@mui/material';
import React from 'react';
import { Sidebar } from '../layout';
import PropTypes from 'prop-types';

const StyledBox = styled(Box)(() => ({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'hidden',
}));
const StyledMain = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
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
