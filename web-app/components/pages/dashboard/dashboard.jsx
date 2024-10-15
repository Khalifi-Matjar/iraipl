import { Box, styled } from '@mui/material';
import React from 'react';
import { Content, Sidebar } from '../layout';

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
}));

export const Dashboard = () => {
    return (
        <StyledBox>
            <Sidebar />
            <StyledMain>
                {/* show the content with header */}
                <Content />
            </StyledMain>
        </StyledBox>
    );
};
