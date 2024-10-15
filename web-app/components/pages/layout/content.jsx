import { Box, styled } from '@mui/material';
import React from 'react';
import { Header } from './header';

const StyledBox = styled(Box)(() => ({
    width: '89.0dvw',
    height: '99.0dvh',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
}));

export const Content = () => {
    return (
        <StyledBox>
            <Header />
        </StyledBox>
    );
};
