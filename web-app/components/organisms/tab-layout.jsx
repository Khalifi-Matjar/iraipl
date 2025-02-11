import { Box, styled, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ChildrenContainer = styled('div')(() => ({
    width: '100%',
}));

export const TabLayout = ({ tabElement }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = (_event, newValue) => {
        setActiveIndex(newValue);
    };

    return (
        <>
            <Box
                sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}
            >
                <Tabs value={activeIndex} onChange={handleChange}>
                    {tabElement.map(({ title }) => (
                        <Tab key={title} label={title} />
                    ))}
                </Tabs>
            </Box>
            <br />
            {tabElement.map(({ children }, index) =>
                index === activeIndex ? (
                    <ChildrenContainer key={`tab-children-${index}`}>
                        {children}
                    </ChildrenContainer>
                ) : null
            )}
        </>
    );
};

TabLayout.propTypes = {
    tabElement: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            children: PropTypes.node,
        })
    ),
};
