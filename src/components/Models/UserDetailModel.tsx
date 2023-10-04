import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar, Button, Modal } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation } from 'react-router-dom';


const UserDetailModel = ({ open, setOpen, handleClose, status } :any) => {


    const location = useLocation();

    const body = (
        <Box className='flex justify-center items-center h-screen'>
            <Card className='sm:w-[450px] w-[80%]' sx={{ borderRadius: '30px' }}>
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
                            <Avatar src='' sx={{ width: 60, height: 60 }} />
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
                                    mt: '10px',
                                }}
                                fullWidth={status === 'Block' || status === 'Unblock'}
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

export default UserDetailModel;
