import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

interface ToastModalProps {
    open?: boolean;
    onClose?: () => void;
    eventMessage?: string;
}

const ToastModal: React.FC<ToastModalProps> = ({ open, onClose, eventMessage }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={true}
            autoHideDuration={6000}
            onClose={onClose}
            action={
                <IconButton size="small" >
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <Box
                sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 1, padding: 1 }}
                className="md:min-w-[350px]"
            >
                <div>
                    <CheckCircleIcon sx={{ marginRight: 1, color: 'rgba(108, 48, 156, 1)' }} />
                </div>
                <div>
                    <Typography variant="body1" color='rgba(108, 48, 156, 1)' fontWeight='bold'>
                        Success
                    </Typography>
                    <Typography variant='body2' color='GrayText'>User Block Successfully</Typography>
                </div>
            </Box>
        </Snackbar>
    );
}

export default ToastModal;
