import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Password from '../../components/Form/Password';
import ButtonLayout from '../../components/Button/Button';

const ChangePassword = () => {
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)'}}>
            <Box className='flex justify-center items-center h-screen'>
                <Card className='sm:w-[450px] w-[80%]' sx={{ borderRadius: '30px' }}>
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
                            <IconButton aria-label="delete" sx={{ padding: '0', color: '#6C309C' }}>
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                        <CardContent className='m-3'>
                            <div>
                                <Password placeholder={"Enter Old Password"} />
                            </div>
                            <div>
                                <Password placeholder={"Enter Your Password"} />
                            </div>
                            <div>
                                <Password placeholder={"Confirm Password"} />
                            </div>
                            <div className="mt-10">
                                <ButtonLayout text='Reset Password' />
                            </div>
                        </CardContent>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ChangePassword;
