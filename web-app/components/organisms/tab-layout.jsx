import { Box, styled, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

const ChildrenContainer = styled('div')(() => ({
    width: '100%',
}));

export const TabLayoutContext = createContext();

export const TabLayout = ({ tabElement, resetIndexTrigger }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [resetIndexTrigger]);

    const handleChange = (_event, newValue) => {
        setActiveIndex(newValue);
    };

    return (
        <TabLayoutContext.Provider value={{ setActiveIndex }}>
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
        </TabLayoutContext.Provider>
    );
};

TabLayout.propTypes = {
    tabElement: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            children: PropTypes.node,
        })
    ),
    resetIndexTrigger: PropTypes.any,
};
