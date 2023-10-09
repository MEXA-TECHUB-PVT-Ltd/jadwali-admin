import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar, Button, Modal, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToastModal from './TostModal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';


const SubscriptionSchema = Yup.object().shape({
    planName: Yup.string()
        .required('Required')
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};


const EditSubscriptionModal = ({ open, setOpen, handleClose, modalData, name, setModalData, setToastOpen, toastOpen }) => {
    const [planName, setPlanName] = React.useState("");

    const { state } = useLocation();
    const navigate = useNavigate();

    let plan = state?.plan || "";
    let previousPage = state?.previousPage || "";
    let selectedFeatures = state?.selectedFeatures || [];
    let openAddModal = state?.openAddModal || '';

    const addFeatures = localStorage.getItem('EditFeatures');
    const feature = JSON.parse(addFeatures) || null



    React.useEffect(() => {
        if (previousPage === 'features' && localStorage.getItem("shouldOpenSubEdit") === "true") {
            if (localStorage.getItem("shouldOpenSubEdit") === "true") {
                setOpen(true);
                // const updatedFeatures = [...feature];
                // setModalData(updatedFeatures);
                setOpen(true);
            }
            else {
                setOpen(false);
                localStorage.setItem("shouldOpenSubEdit", "false");
            }
        }
    }, [])

    React.useEffect(() => {
        if (localStorage.getItem("shouldOpenSubEdit") === 'false') {
            setToastOpen(false);
        }
    }, []);



    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const body = (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)' }}>
            <ToastModal open={toastOpen} onClose={handleCloseToast} eventMessage="Edit Plan Successfully!" />
            <Box style={style}>
                <Card className='sm:w-[500px] w-[80%]' sx={{ borderRadius: '30px' }}>
                    <CardContent className='p-0' sx={{ padding: 0 }}>
                        <div className='mb-12 bg-[#C7AEDB] px-5 py-3 flex justify-between items-center'>
                            <Typography
                                sx={{
                                    m: 0,
                                    fontSize: '20px', color: '#6C309C', margin: '0', fontWeight: 'medium'
                                }}
                            >
                                Edit Subscription
                            </Typography>
                            <IconButton aria-label="delete" onClick={handleClose} sx={{ padding: '0', color: '#6C309C' }}>
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                        <CardContent className='m-3'>
                            <Formik
                                initialValues={{
                                    planName: name ? name : '',
                                    selectFeatures: ''
                                }}
                                validationSchema={SubscriptionSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                    setToastOpen(true);
                                    setTimeout(() => {
                                        setOpen(false)
                                        localStorage.setItem('shouldOpenSubEdit', JSON.stringify(false));
                                        localStorage.setItem('EditFeatures', JSON.stringify([]));
                                    }, 1000)
                                }}
                            >
                                {({ errors, touched, isValid, setFieldValue }) => (
                                    <Form>
                                        <div className='mb-4'>
                                            <Field
                                                name="planName"
                                                as={TextField}
                                                id="outlined-basic"
                                                placeholder={'Plan Name'}
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => {
                                                    setFieldValue("planName", e.target.value);
                                                    setPlanName(e.target.value);
                                                }}
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

                                        {
                                            feature?.length > 0 && (
                                                <>
                                                    <Typography mb={2}>Features</Typography>
                                                    <div className="flex flex-wrap gap-2 mb-2 max-h-40 overflow-auto">
                                                        {feature.map((feature, index) => (
                                                            <span key={index} className="bg-[#F5F5F5] px-3 py-1 rounded-full">
                                                                {feature.featuresDescription}
                                                            </span>
                                                        ))}

                                                        <Link
                                                            to='/dashboard/features'
                                                            state={{ plan: planName ? planName : undefined, previousPage: 'subscription', previousFeatures: modalData, openAddModal: 'false', modalName: 'Edit' }}
                                                            className='mb-4 bg-[#6C309C] text-white p-2 px-4 rounded-[20px] flex justify-between items-center cursor-pointer'
                                                        >
                                                            <Typography sx={{ color: '#fff' }}>Add more features</Typography>
                                                            <KeyboardArrowDownIcon />
                                                        </Link>
                                                    </div>
                                                </>
                                            )
                                        }


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
                                            >
                                                Edit Plan
                                            </Button>
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

export default EditSubscriptionModal;

