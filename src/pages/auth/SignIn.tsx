import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import CardLayout from '../../components/Card/CardLayout';
import { Typography, TextField } from '@mui/material';
import ButtonLayout from '../../components/Button/Button';
import { Link, redirect, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const authenticateUser = async (email:any, password:any) => {
    return email && password;
}


const SignIn = () => {
    const initialValues: any = {
        email: '',
        password: '',
    };

    const navigate = useNavigate();

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        const isAuthenticated = await authenticateUser(values.email, values.password);
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        else {
            console.log("USER NOT AUTHENTICATED")
        }
    };

    return (
        <div className='bg-[#C7AEDB]'>
            <CardLayout title='JADWALI' subTitle='Sign In' description='Sign in to your jadwali account'>
                <Formik
                    initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <Field name="email" >
                                {({ field }: any) => (
                                    <Email field={field} />
                                )}
                            </Field>
                            <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                <ErrorMessage name="email" />
                            </Typography>
                            <div className="mt-4">
                                <Field name="password">
                                    {({ field }: any) => (
                                        <Password placeholder="Enter Your Password" field={field} />
                                    )}
                                </Field>
                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                    <ErrorMessage name="password" />
                                </Typography>
                            </div>

                            <Link to={'/auth/forgot-password'}>
                                <Typography className='text-end' sx={{ fontWeight: 'medium' }} color='#6C309C'>Forgot Password?</Typography>
                            </Link>

                            <div className="mt-10">
                                <ButtonLayout text='Sign In' type="submit" disabled={isSubmitting} onClick={() => handleSubmit(errors, isSubmitting)}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardLayout>
        </div>
    )
}

export default SignIn;
