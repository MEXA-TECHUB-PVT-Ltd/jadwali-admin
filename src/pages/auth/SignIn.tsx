import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography, TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormLayout from '../../components/Form/Layout';
import CardLayout from '../../components/Card/CardLayout';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const SignIn = () => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (values: any) => {
        console.log("Login data: ", values);
        navigate('/dashboard')
    };

    return (
        <CardLayout title='JADWALI' subTitle='Sign In' description='Sign in to your account'>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='mb-5'>
                            <Field name="email">
                                {({ field }: any) => (
                                    <TextField
                                        {...field}
                                        id="email"
                                        variant="outlined"
                                        placeholder='Enter Your Email'
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '20px',
                                                borderColor: 'rgba(0, 0, 0, 0.04)',
                                                borderWidth: '0px',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(0, 0, 0, 0.04)',
                                            },
                                            // mb: 3,
                                            p: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            borderRadius: '20px',

                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        size='small'
                                    />
                                )}
                            </Field>
                            <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                <ErrorMessage name="email" />
                            </Typography>
                        </div>

                        <div className='mb-2'>
                            <Field name="password">
                                {({ field }: any) => (
                                    <TextField
                                        {...field}
                                        id="password"
                                        placeholder={'Enter Password'}
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '20px',
                                                borderColor: 'rgba(0, 0, 0, 0.04)',
                                                borderWidth: '0px',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(0, 0, 0, 0.04)',
                                            },
                                            p: 0,
                                            borderRadius: '20px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={handleTogglePassword}>
                                                        {showPassword ? <Visibility sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} /> : <VisibilityOff sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        size='small'
                                    />
                                )}
                            </Field>
                            <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                <ErrorMessage name="password" />
                            </Typography>
                        </div>
                        <div className="mb-12">
                            <Link to={'/auth/forgot-password'}>
                                <Typography className='text-end' sx={{ fontWeight: 'medium' }} color='#6C309C'>Forgot Password?</Typography>
                            </Link>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                            sx={{
                                backgroundColor: '#6C309C',
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: '#6C309C',
                                }
                            }}
                        >
                            Sign In
                        </Button>
                    </Form>
                )}
            </Formik>
        </CardLayout>
    );
}

export default SignIn;
