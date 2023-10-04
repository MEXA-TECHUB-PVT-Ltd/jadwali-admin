import React from 'react';
import { Typography, Card, CardContent, CardActions, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import SubscriptionModel from '../../components/Models/SubscriptionModel';
import EditSubscriptionModel from '../../components/Models/EditSubscriptionModel';
import DeleteModal from '../../components/Models/DeleteModel';



const SubscriptionPlan = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState<string>("");
    const [eventMessage, setEventMessage] = React.useState<string>('');
    const [modalData, setModalData] = React.useState()

    const handleOpenModal = (title: string, message: string, data?: any) => {
        setModalTitle(title)
        setEventMessage(message)
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleEditOpenModal = (title: string, message: string, data?: any) => {
        setModalTitle(title)
        setEventMessage(message)
        setModalData(data)
        setIsEditModalOpen(true);
    };

    const handleEditCloseModal = () => {
        setIsEditModalOpen(false);
    };


    const handleDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }
    const handleDeleteCloseModal = () => {
        setIsDeleteModalOpen(false)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <Typography fontWeight='bold' fontSize='20px' color='#342E59'>Subscription Plan</Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#6C309C',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#6C309C',
                        }
                    }}
                    onClick={() => handleOpenModal("Add Plan", "Plan Added Successfully!", undefined)}
                >
                    <AddIcon />
                    Add Plan
                </Button>
            </div>

            {/* Monthly Plan */}
            <Card sx={{ marginBottom: 2, padding: 2, borderRadius: '10px' }}>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h5" color='#6C309C' fontWeight='medium'>Monthly Plan</Typography>
                        <div>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6C309C',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#6C309C',
                                    }
                                }}
                                onClick={() => handleDeleteModal()}
                            >
                                <DeleteIcon sx={{ fontSize: '20px', mr: 1 }} />
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6C309C',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#6C309C',
                                    },
                                    ml: 2
                                }}
                                onClick={() => handleEditOpenModal("Edit Plan", "Edit Added Successfully!", {
                                    planName: 'Free',
                                    planType: 'NONE',
                                    description: 'No description'
                                })}
                            >
                                <BorderColorIcon sx={{ fontSize: '20px', mr: 1 }} />
                                Edit
                            </Button>

                        </div>
                    </div>
                    <div className='mb-3'>
                        <Typography variant="h6" sx={{ fontSize: '16px' }}>Lorem ipsum dolor sit amet,</Typography>
                        <Typography variant='body2' color='GrayText' sx={{ fontSize: '14px', mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing </Typography>
                    </div>
                    <div className='mb-3'>
                        <Typography variant="h6" sx={{ fontSize: '16px' }}>Lorem ipsum dolor sit amet,</Typography>
                        <Typography variant='body2' color='GrayText' sx={{ fontSize: '14px', mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing </Typography>
                    </div>
                    <div className='mb-3'>
                        <Typography variant="h6" sx={{ fontSize: '16px' }}>Lorem ipsum dolor sit amet,</Typography>
                        <Typography variant='body2' color='GrayText' sx={{ fontSize: '14px', mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing </Typography>
                    </div>
                </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card sx={{ marginBottom: 2, padding: 2, borderRadius: '10px' }}>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h5" color='#6C309C' fontWeight='medium'>Yearly Plan</Typography>
                        <div>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6C309C',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#6C309C',
                                    }
                                }}
                                onClick={() => handleDeleteModal()}
                            >
                                <DeleteIcon sx={{ fontSize: '20px', mr: 1 }} />
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6C309C',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#6C309C',
                                    },
                                    ml: 2
                                }}
                                onClick={() => handleEditOpenModal("Edit Plan", "Edit Added Successfully!", {
                                    planName: 'Free',
                                    planType: 'NONE',
                                    description: 'No description'
                                })}
                            >
                                <BorderColorIcon sx={{ fontSize: '20px', mr: 1 }} />
                                Edit
                            </Button>

                        </div>
                    </div>
                    <div className='mb-3'>
                        <Typography variant="h6" sx={{ fontSize: '16px' }}>Lorem ipsum dolor sit amet,</Typography>
                        <Typography variant='body2' color='GrayText' sx={{ fontSize: '14px', mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing </Typography>
                    </div>
                    <div className='mb-3'>
                        <Typography variant="h6" sx={{ fontSize: '16px' }}>Lorem ipsum dolor sit amet,</Typography>
                        <Typography variant='body2' color='GrayText' sx={{ fontSize: '14px', mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing </Typography>
                    </div>
                    <div className='mb-3'>
                        <Typography variant="h6" sx={{ fontSize: '16px' }}>Lorem ipsum dolor sit amet,</Typography>
                        <Typography variant='body2' color='GrayText' sx={{ fontSize: '14px', mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing </Typography>
                    </div>
                </CardContent>
            </Card>


            <SubscriptionModel
                open={isModalOpen}
                handleClose={handleCloseModal}
                setOpen={setIsModalOpen}
                title={modalTitle}
                eventMessage={eventMessage}
            />
            <EditSubscriptionModel
                open={isEditModalOpen}
                handleClose={handleEditCloseModal}
                setOpen={handleEditOpenModal}
                title={modalTitle}
                modalData={modalData}
                eventMessage={eventMessage}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                handleClose={handleDeleteCloseModal}
                onDelete={handleDeleteCloseModal}
                title="Delete Subscription Plan"
                paragraph="Do you want to delete this subscription plan?"
                actionText="Delete"
            />
        </>
    );
}

export default SubscriptionPlan;

