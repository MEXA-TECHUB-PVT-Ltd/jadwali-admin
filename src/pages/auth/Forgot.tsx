import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography, TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormLayout from '../../components/Form/Layout';
import CardLayout from '../../components/Card/CardLayout';
import { useNavigate } from 'react-router-dom';



const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
});

const Forgot = () => {
    const navigate = useNavigate();
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        console.log("user is authenticated:", values.email);
        navigate('/auth/verification-code')
        setSubmitting(false);
    };

    return (
        <FormLayout link='/auth/sign-in'>
            <CardLayout title='JADWALI' subTitle='Forgot Password' description='Enter your Email address to send a verification code'>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='mb-12'>
                                <Field name="email">
                                    {({ field }:any) => (
                                        <TextField
                                            id="outlined-basic"
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
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                    <ErrorMessage name="email" />
                                </Typography>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth
                                variant='contained'
                                sx={{
                                    backgroundColor: '#6C309C',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#6C309C',
                                    }
                                }}
                            >
                                Send Code
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardLayout>
        </FormLayout>
    );
}

export default Forgot;
