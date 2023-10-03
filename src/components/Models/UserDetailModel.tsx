import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Password from '../../components/Form/Password';
import ButtonLayout from '../../components/Button/Button';

const UserDetailModel = () => {
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)' }}>
            <Box className='flex justify-center items-center h-screen'>
                <Card className='sm:w-[450px] w-[80%]' sx={{ borderRadius: '30px' }}>
                    <CardContent className='p-0' sx={{ padding: 0 }}>
                        <div className='mb-12 px-5 py-3 flex justify-between items-center'>
                            <Typography
                                sx={{
                                    m: 0,
                                    fontSize: '20px', margin: '0'
                                }}
                            >
                                User Details
                            </Typography>
                            <IconButton aria-label="delete" >
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                        <CardContent className='m-3'>
                            <Box className='flex flex-col items-center mb-10'>
                                <Avatar src='' sx={{ width: 60, height: 60 }} />
                                <Typography variant="h6" gutterBottom>
                                    Testing
                                </Typography>
                                <Typography color="textSecondary">
                                    Total Events: Testing
                                </Typography>
                            </Box>
                        <ButtonLayout text='Block User' />
                        </CardContent>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default UserDetailModel;
