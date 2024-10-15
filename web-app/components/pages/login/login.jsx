import { Box, styled, Typography, Paper, Grid, TextField, Button, InputAdornment, Link, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';

const StyledBox = styled(Box)(() => ({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
}));

const StyledPaper = styled(Paper)(() => ({
    padding: '20px',
    width: '690px',
}));

const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-around',
}));

const BoxImage = styled(Box)(() => ({
    display: 'grid',
    placeItems: 'center',
}));

const StyledImage = {
    backgroundColor: 'rgb(234, 245, 247)',
};

const BoxLogin = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'center',
    position: 'relative',
    padding: '30px 0px 0px 0px',
}));

// For Input text
const InputField = (props) => <StyledTextField variant="outlined" size="small" {...props} />;

const StyledTextField = styled(TextField)(() => ({
    '& .MuiInputBase-input::placeholder': {
        fontSize: '15px',
        fontWeight: '400',
        color: 'gray',
    },
    '& .MuiInputBase-input': {
        fontSize: '15px',
        fontWeight: '300',
    },
}));
//end

const LoginButton = styled(Button)(() => ({
    marginTop: '15px',
    textTransform: 'capitalize',
}));

const ForgotButton = styled(Button)(() => ({
    color: 'gray',
    textTransform: 'capitalize',
}));

const SignUpText = styled(Typography)(() => ({
    top: '80px',
    fontSize: 'small',
}));

export const Login = () => {
    const [open, setOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false); // untuk Snackbar
    const [snackbarMessage, setSnackbarMessage] = React.useState(''); // pesan untuk Snackbar
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: ({ email, password }) => {
            setOpen(true);
            setSnackbarOpen(false);
            axios({
                method: 'post',
                url: '/api/authentication/login-attempt',
                data: {
                    email,
                    password,
                },
            })
                .then(function (response) {
                    const token = response.data.token;
                    //close backdrop after login
                    setOpen(false);
                    if (token) {
                        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
                        setSnackbarMessage('Login berhasil');
                        setSnackbarOpen(true);
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 1500);
                    } else {
                        console.error('No token');
                        setSnackbarMessage('Login gagal, token tidak ditemukan.');
                        setSnackbarOpen(true); // snackbar opened
                    }
                })
                .catch(function (error) {
                    //close the backdrop if failed login
                    setOpen(false);
                    if (error.response) {
                        console.error(error.response.data);
                        setSnackbarMessage('Login gagal: ' + error.response.data.message);
                        setSnackbarOpen(true); // opened snackbar after error
                    } else {
                        console.error(error.message);
                        setSnackbarMessage('Terjadi kesalahan: ' + error.message);
                        setSnackbarOpen(true); // opened snackbar after error
                    }

                    setSnackbarOpen(true);
                });
        },
        validationSchema: Yup.object({
            //Yup Validation
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
    });

    return (
        <StyledBox>
            <StyledPaper>
                <StyledGrid container>
                    <BoxImage>
                        <img src="/images/logo-ira.png" alt="Logo" style={StyledImage} />
                    </BoxImage>
                    <form action="" method="post" onSubmit={formik.handleSubmit}>
                        <BoxLogin>
                            <InputField
                                label="Email"
                                placeholder="Email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                helperText={!!formik.errors.email && formik.touched.email && formik.errors.email}
                                error={!!formik.errors.email && formik.touched.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailRoundedIcon fontSize="medium" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <InputField
                                label="Password"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockRoundedIcon fontSize="medium" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <LoginButton variant="contained" size="medium" color="primary" type="submit" disableElevation>
                                Login
                            </LoginButton>
                            <Backdrop sx={(theme) => ({ color: '#FFFFFF', zIndex: theme.zIndex.drawer + 1 })} open={open}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={6000}
                                onClose={() => setSnackbarOpen(false)}
                                message={snackbarMessage}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            />
                            <ForgotButton variant="text" size="medium" disableElevation>
                                Lupa Password?
                            </ForgotButton>
                            <SignUpText component="span">
                                Belum punya akun?
                                <Link component={RouterLink} to="/welcome" underline="hover" color="black">
                                    Daftar
                                </Link>
                            </SignUpText>
                        </BoxLogin>
                    </form>
                </StyledGrid>
                <Link component={RouterLink} to="/welcome">
                    To welcome page
                </Link>
            </StyledPaper>
        </StyledBox>
    );
};
