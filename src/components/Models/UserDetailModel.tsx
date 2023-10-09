import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar, Button, Modal } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteModal from './DeleteModel';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const UserDetailModel = ({ open, setOpen, handleClose, status, onToggleStatus, isDeleteModalOpen, handleDeleteCloseModal, setIsDeleteModalOpen }: any) => {

    const handleStatusClick = () => {
        if (status === 'Unblock' || status === 'Block') {
            setIsDeleteModalOpen(true);
        }
    }

    const body = (
        <Box style={style}>
            <Card className='sm:w-[550px] w-[80%]' sx={{ borderRadius: '30px' }}>
                <CardContent className='p-0' sx={{ padding: 0 }}>
                    <div className='px-5 py-3 flex justify-between items-center'>
                        <Typography
                            sx={{
                                m: 0,
                                fontSize: '20px',
                                margin: '0',
                                fontWeight: 'bold'
                            }}
                        >
                            User Details
                        </Typography>
                        <IconButton aria-label="delete" onClick={handleClose}>
                            <CancelIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <CardContent className='m-3'>
                        <Box className='flex flex-col items-center'>
                            <Avatar src='' sx={{ width: 60, height: 60, mb: 2 }} />
                            <Typography variant="h6" gutterBottom color='rgba(108, 48, 156, 1)'>
                                Username
                            </Typography>
                            <div className='flex'>
                                <Typography color="textSecondary">
                                    Total Events:
                                </Typography>
                                <strong className='text-dark ms-2'>15</strong>
                            </div>
                            <Button
                                sx={{
                                    backgroundColor:
                                        status === 'Unpaid' ? '#FF5858' :
                                            status === 'Paid' ? '#00C342' : '#6C309C',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        backgroundColor:
                                            status === 'Unpaid' ? '#FF5858' :
                                                status === 'Paid' ? '#00C342' : '#6C309C',
                                    },
                                    borderColor: 'inherit',
                                    color: 'white',
                                    mt: status === 'Unpaid' || status === 'Paid' ? 3 : 6,
                                    cursor: status === 'Unpaid' || status === 'Paid' ? 'default' : 'pointer',
                                }}
                                fullWidth={status === 'Block' || status === 'Unblock'}
                                onClick={handleStatusClick}
                            >
                                {
                                    status === 'Block' ? 'Block User' :
                                        status === 'Unblock' ? 'Unblock User' :
                                            status
                                }
                            </Button>
                        </Box>
                    </CardContent>
                </CardContent>
            </Card>
        </Box>
    );

    return (
        <>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)' }}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="user-detail-modal-title"
                    aria-describedby="user-detail-modal-description"
                    slotProps={{
                        backdrop: { style: { opacity: 0.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' } }
                    }}
                >
                    {body}
                </Modal>
            </div>
            <DeleteModal
                open={isDeleteModalOpen}
                handleClose={handleDeleteCloseModal}
                onDelete={onToggleStatus}
                title="Block User"
                paragraph="Do you really want to block this User?"
                actionText="Block"
                setOpen={setOpen}
            />
        </>
    )
}

export default UserDetailModel;
