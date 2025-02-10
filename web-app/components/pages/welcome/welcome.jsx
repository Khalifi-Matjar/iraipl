import {
    Avatar,
    Box,
    Chip,
    Paper,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';

const techStacks = [
    {
        avatar: 'https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png',
        label: 'React',
    },
    {
        avatar: 'https://w7.pngwing.com/pngs/452/24/png-transparent-js-logo-node-logos-and-brands-icon.png',
        label: 'NodeJS',
    },
    {
        avatar: 'https://w7.pngwing.com/pngs/761/513/png-transparent-material-ui-logo.png',
        label: 'Material UI',
    },
    {
        avatar: 'https://w7.pngwing.com/pngs/747/798/png-transparent-mysql-logo-mysql-database-web-development-computer-software-dolphin-marine-mammal-animals-text-thumbnail.png',
        label: 'MySQL',
    },
];

const StyledBox = styled(Box)(() => ({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledPaper = styled(Paper)(() => ({
    padding: '30px',
    width: '800px',
}));

export const Welcome = () => {
    useEffect(() => {
        // attempt to fetch welcome API to see if the absolute path works well
        axios
            .get('/api/welcome')
            .then(
                (welcome) =>
                    void console.log('welcome API fetch testing', welcome.data)
            );
    }, []);

    return (
        <StyledBox>
            <StyledPaper>
                <Typography variant="h2">IRA Pengelolaan v1</Typography>
                <Typography variant="h4">by: Khalifi Matjar</Typography>
                <Typography variant="h5">
                    A progressive web based application built to manage and
                    monitor flows of environment and neighborhood maintenance
                    bill is better
                </Typography>
                <br />
                <Stack direction="row" spacing={1}>
                    <Typography variant="h6">Tech stacks:</Typography>
                    {techStacks.map(({ avatar, label }) => (
                        <Chip
                            key={label}
                            avatar={<Avatar alt={label} src={avatar} />}
                            label={label}
                            variant="outlined"
                        />
                    ))}
                </Stack>
            </StyledPaper>
        </StyledBox>
    );
};
