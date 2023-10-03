import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonLayout from '../../components/Button/Button';

const UserDetailModel = (props:any) => {
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)' }}>
            <Box className='flex justify-center items-center h-screen'>
                <Card className='sm:w-[450px] w-[80%]' sx={{ borderRadius: '30px' }}>
                    <CardContent className='p-0' sx={{ padding: 0 }}>
                        <div className='px-5 py-3 flex justify-between items-center'>
                            <Typography
                                sx={{
                                    m: 0,
                                    fontSize: '20px', margin: '0', fontWeight: 'bold'
                                }}
                            >
                                User Details
                            </Typography>
                            <IconButton aria-label="delete" >
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                        <CardContent className='m-3'>
                            <Box className='flex flex-col items-center'>
                                <Avatar src='' sx={{ width: 60, height: 60 }} />
                                <Typography variant="h6" gutterBottom color='rgba(108, 48, 156, 1)'>
                                    Testing
                                </Typography>
                                <div className='flex'>
                                    <Typography color="textSecondary">
                                        Total Events:
                                    </Typography>
                                    <strong className='text-dark ms-2'>Testing</strong>
                                </div>
                                <Button
                                    sx={{
                                        backgroundColor: '#6C309C',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            backgroundColor: '#6C309C',
                                        },
                                        borderColor: 'inherit',
                                        color: 'white',
                                        mt: '10px'
                                    }}
                                >Unpaid</Button>
                            </Box>
                            {/* <ButtonLayout text='Block User' /> */}
                        </CardContent>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default UserDetailModel;
