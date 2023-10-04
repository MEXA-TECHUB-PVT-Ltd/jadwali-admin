import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar, Button, Modal, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToastModal from './TostModal';



const SubscriptionSchema = Yup.object().shape({
    planName: Yup.string()
        .required('Required'),
    planType: Yup.string()
        .required('Required'),
    description: Yup.string()
        .required('Required')
});


const EditSubscriptionModel = ({ open, setOpen, handleClose, title, eventMessage, modalData }: any) => {
    const [toastOpen, setToastOpen] = React.useState<boolean>(false);

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const body = (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)' }}>
            <ToastModal open={toastOpen} onClose={handleCloseToast} eventMessage={eventMessage} />
            <Box className='flex justify-center items-center h-screen'>
                <Card className='sm:w-[450px] w-[80%]' sx={{ borderRadius: '30px' }}>
                    <CardContent className='p-0' sx={{ padding: 0 }}>
                        <div className='mb-12 bg-[#C7AEDB] px-5 py-3 flex justify-between items-center'>
                            <Typography
                                sx={{
                                    m: 0,
                                    fontSize: '20px', color: '#6C309C', margin: '0', fontWeight: 'medium'
                                }}
                            >
                                {title}
                            </Typography>
                            <IconButton aria-label="delete" onClick={handleClose} sx={{ padding: '0', color: '#6C309C' }}>
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                        <CardContent className='m-3'>
                            <Formik
                                initialValues={{
                                    planName: modalData ? modalData.planName : '',
                                    planType: modalData ? modalData.planType : '',
                                    description: modalData ? modalData.description : ''
                                }}
                                validationSchema={SubscriptionSchema}
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
                                                name="planName"
                                                as={TextField}
                                                id="outlined-basic"
                                                placeholder={'Plan Name'}
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
                                                size='small'
                                            />
                                            {errors.planName && typeof errors.planName === 'string' ? (
                                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                                    {errors.planName}
                                                </Typography>
                                            ) : null}
                                        </div>

                                        <div className='mb-4'>
                                            <Field
                                                name="planType"
                                                as={TextField}
                                                id="outlined-basic"
                                                placeholder={'Plan Type'}
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
                                                size='small'
                                            />
                                            {errors.planType && typeof errors.planType === 'string' ? (
                                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                                    {errors.planType}
                                                </Typography>
                                            ) : null}
                                        </div>

                                        <div className='mb-4'>
                                            <Field
                                                name="description"
                                                as={TextField}
                                                id="outlined-basic"
                                                placeholder={'Description'}
                                                variant="outlined"
                                                fullWidth
                                                value={modalData && modalData.description}
                                                multiline
                                                rows={4}
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
                                                size='small'
                                            />
                                            {errors.description && typeof errors.description === 'string' ? (
                                                <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'red', ml: 2 }}>
                                                    {errors.description}
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

export default EditSubscriptionModel;

