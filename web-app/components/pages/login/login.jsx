import { Box, styled, Typography, Paper, Grid, TextField, Button, InputAdornment, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/authentication/login-attempt',
                data: {
                    email: values.email,
                    password: values.password,
                },
            })
                .then(function (response) {
                    console.log(response.data);
                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem('token', token);
                        console.log('token: ', token);
                    } else {
                        console.log('gada token');
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data); // Cek pesan error dari server
                    } else {
                        console.log(error.message); // Cek error jika tidak ada respons dari server
                    }
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
