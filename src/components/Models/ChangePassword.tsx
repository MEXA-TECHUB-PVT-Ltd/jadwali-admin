import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar, Button, Modal, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToastModal from './TostModal';



const PasswordChangeSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Required'),
    newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match!')
        .required('Required')
});



const ChangePasswordModel = ({ open, setOpen, handleClose, status }: any) => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);
    const [toastOpen, setToastOpen] = React.useState<boolean>(false);


    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleNewPassword = () => {
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const body = (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)' }}>
            <ToastModal open={toastOpen} onClose={handleCloseToast} eventMessage="Password Changed Successfully!" />
            <Box className='flex justify-center items-center h-screen'>
                <Card className='sm:w-[500px] w-[80%]' sx={{ borderRadius: '30px' }}>
                    <CardContent className='p-0' sx={{ padding: 0 }}>
                        <div className='mb-12 bg-[#C7AEDB] px-5 py-3 flex justify-between items-center'>
                            <Typography
                                sx={{
                                    m: 0,
                                    fontSize: '20px', color: '#6C309C', margin: '0'
                                }}
                            >
                                Change Password
                            </Typography>
                            <IconButton aria-label="delete" onClick={handleClose} sx={{ padding: '0', color: '#6C309C' }}>
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                        <CardContent className='m-3'>
                            <Formik
                                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                                validationSchema={PasswordChangeSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                    setToastOpen(true);
                                    setTimeout(() => {
                                        setOpen(false)
                                    }, 2000)
                                }}
                            >
                                {({ errors, touched, isValid }) => (
                                    <Form>
                                        <div className='mb-4'>
                                            <Field
                                                name="oldPassword"
                                                type={showPassword ? 'text' : 'password'}
                                                as={TextField}
                                                id="outlined-basic"
                                                placeholder={'Enter Old Password'}
                                                variant="outlined"
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
                                            {errors.oldPassword && touched.oldPassword ? (
                                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                                    {errors.oldPassword}</Typography>
                                            ) : null}
                                        </div>

                                        <div className='mb-4'>
                                            <Field
                                                name="newPassword"
                                                type={showNewPassword ? 'text' : 'password'}
                                                as={TextField}
                                                id="outlined-basic"
                                                placeholder={'Enter New Password'}
                                                variant="outlined"
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
                                                            <IconButton edge="end" onClick={handleToggleNewPassword}>
                                                                {showNewPassword ? <Visibility sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} /> : <VisibilityOff sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                size='small'
                                            />
                                            {errors.newPassword && touched.newPassword ? (
                                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                                    {errors.newPassword}
                                                </Typography>
                                            ) : null}
                                        </div>

                                        <div className='mb-4'>
                                            <Field
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                as={TextField}
                                                id="outlined-basic"
                                                placeholder={'Confirm Password'}
                                                variant="outlined"
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
                                                            <IconButton edge="end" onClick={handleToggleConfirmPassword}>
                                                                {showConfirmPassword ? <Visibility sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} /> : <VisibilityOff sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '16px' }} />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                size='small'
                                            />
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                                    {errors.confirmPassword}
                                                </Typography>) : null}
                                        </div>

                                        <div className="mt-10">
                                            <Button
                                                type="submit"
                                                disabled={!isValid}
                                                fullWidth
                                                sx={{
                                                    backgroundColor: '#6C309C',
                                                    borderRadius: '20px',
                                                    '&:hover': {
                                                        backgroundColor: '#6C309C',
                                                    },
                                                    color: '#fff',
                                                }}
                                            >Submit</Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)' }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="user-detail-modal-title"
                aria-describedby="user-detail-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

export default ChangePasswordModel;

